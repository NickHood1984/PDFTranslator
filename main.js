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
        try {
            // 检查命令和路径
            console.log('Executing command:', command);
            console.log('Command options:', options);
            console.log('Working directory:', process.cwd());
            
            // 确保 Python 环境目录存在
            const pythonEnvPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env');
            if (!fs.existsSync(pythonEnvPath)) {
                throw new Error(`Python 环境目录不存在: ${pythonEnvPath}`);
            }
            
            // 修改环境变量
            const env = {
                ...process.env,
                ...options.env,
                PATH: `${path.join(pythonEnvPath, 'Scripts')}${path.delimiter}${path.join(pythonEnvPath)}${path.delimiter}${process.env.PATH}`,
                PYTHONHOME: pythonEnvPath,
                PYTHONPATH: pythonEnvPath,
                PYTHONIOENCODING: 'utf-8',
                LANG: 'zh_CN.UTF-8'
            };
            
            // 使用 spawn 而不是 exec
            const { spawn } = require('child_process');
            const args = command.split(' ').filter(arg => arg);
            const pythonExe = args[0];
            args.shift(); // 移除第一个参数（python.exe）
            
            console.log('Spawning process with:', {
                command: pythonExe,
                args,
                env
            });
            
            const childProcess = spawn(pythonExe, args, {
                ...options,
                env,
                shell: true,
                windowsHide: false
            });

            let stdoutData = '';
            let stderrData = '';

            childProcess.stdout.on('data', (data) => {
                stdoutData += data;
                mainWindow.webContents.send('python-output', data);
            });

            childProcess.stderr.on('data', (data) => {
                stderrData += data;
                const output = data.toString();
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
                console.error('Process error:', error);
                resolve({ 
                    code: 1, 
                    error: `进程启动失败: ${error.message}`,
                    stdout: stdoutData,
                    stderr: stderrData
                });
            });

            childProcess.on('close', (code) => {
                console.log(`Process exited with code ${code}`);
                resolve({ 
                    code, 
                    stdout: stdoutData,
                    stderr: stderrData
                });
            });
        } catch (error) {
            console.error('Command execution error:', error);
            resolve({ 
                code: 1, 
                error: error.message 
            });
        }
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