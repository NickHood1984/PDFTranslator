const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const url = require('url');
const fs = require('fs');
const Store = require('electron-store');

// 初始化electron-store
const store = new Store();

const isDev = process.env.NODE_ENV === 'development';

// 在创建窗口之前设置环境变量
process.env.HF_ENDPOINT = 'https://hf-mirror.com';

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false, // 先不显示窗口
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: true,
            enableRemoteModule: true
        }
    });

    // 设置CSP头
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': ["default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"]
            }
        });
    });

    mainWindow.loadFile('index.html');
    
    // 当内容加载完成时再显示窗口，避免白屏
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    
    // 开发环境下打开开发者工具
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

// 提前初始化一些资源
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// 优化应用退出
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 添加electron-store的IPC处理
ipcMain.on('electron-store-get-data', (event) => {
    event.returnValue = store.get('config');
});

ipcMain.on('electron-store-set', (event, key, value) => {
    store.set(key, value);
});

// 处理与渲染进程的通信
ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'PDF Files', extensions: ['pdf'] }
        ]
    });
    return result.filePaths[0];
});

ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    return result.filePaths[0];
});

// 执行 Python 命令
ipcMain.handle('execute-command', async (event, command, options) => {
    return new Promise((resolve, reject) => {
        console.log('Executing command with options:', { command, options });
        
        // 确保工作目录存在
        const workingDir = path.dirname(command.split('"')[3]); // 获取输入文件的目录作为工作目录
        if (!fs.existsSync(workingDir)) {
            console.error('Working directory does not exist:', workingDir);
            resolve({ code: 1, error: `工作目录不存在: ${workingDir}` });
            return;
        }

        const childProcess = exec(command, {
            ...options,
            windowsHide: false,
            shell: true,
            maxBuffer: 1024 * 1024 * 10, // 10MB buffer
            cwd: workingDir // 设置工作目录
        }, (error, stdout, stderr) => {
            if (error) {
                console.error('Command execution error:', error);
                console.error('Command:', command);
                console.error('Options:', options);
                console.error('Stderr:', stderr);
                
                // 检查是否是权限问题
                if (error.code === 'EACCES') {
                    resolve({ code: error.code, error: '权限不足，请以管理员身份运行程序' });
                } else {
                    resolve({ code: error.code, error: `执行错误: ${error.message}\n${stderr}` });
                }
                return;
            }
            resolve({ code: 0, stdout, stderr });
        });

        // 实时输出进度信息
        childProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('Command stdout:', output);
            mainWindow.webContents.send('python-output', output);
        });

        childProcess.stderr.on('data', (data) => {
            const output = data.toString();
            console.log('Command stderr:', output);
            
            // 检查是否包含进度信息
            if (output.includes('%') || 
                output.includes('Stage:') || 
                output.includes('开始执行转换') ||
                output.includes('输入文件:') ||
                output.includes('成功读取配置') ||
                output.includes('使用翻译服务') ||
                output.includes('PDF文件大小') ||
                output.includes('翻译完成')) {
                mainWindow.webContents.send('command-progress', output);
            } else {
                mainWindow.webContents.send('command-error', output);
            }
        });

        childProcess.on('error', (error) => {
            console.error('Child process error:', error);
            mainWindow.webContents.send('command-error', `进程错误: ${error.message}`);
            resolve({ code: 1, error: `进程错误: ${error.message}` });
        });
    });
});

// 获取用户数据路径
ipcMain.handle('get-user-data-path', () => {
    return app.getPath('userData');
});

ipcMain.handle('get-resources-path', () => {
    return process.resourcesPath;
});

// 添加错误处理
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    dialog.showErrorBox('错误', `发生未知错误: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 