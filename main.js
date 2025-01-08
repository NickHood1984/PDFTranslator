const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const url = require('url');
const fs = require('fs');
const Store = require('electron-store');
const isDev = require('electron-is-dev');

// 初始化electron-store
Store.initRenderer();

const store = new Store();

const pythonExecutable = getMainScript();
console.log('Python executable path:', pythonExecutable);

if (!fs.existsSync(pythonExecutable)) {
    console.error('Python executable not found at:', pythonExecutable);
} else {
    const pythonPath = getPythonPath();
    const mainScript = getMainScript();
    
    console.log('Python path:', pythonPath);
    console.log('Main script path:', mainScript);

    if (!fs.existsSync(pythonPath)) {
        console.error('Python not found at:', pythonPath);
        return;
    }

    if (!fs.existsSync(mainScript)) {
        console.error('Main script not found at:', mainScript);
        return;
    }

    const pythonProcess = spawn(pythonPath, [mainScript], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    pythonProcess.stdout.on('data', (data) => {
        console.log('Python output:', data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Python error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
        console.log('Python process exited with code:', code);
    });
}

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

        // 检查 Python 命令
        const pythonPath = command.split('"')[1];
        if (!fs.existsSync(pythonPath)) {
            console.error('Python executable not found:', pythonPath);
            resolve({ code: 1, error: `Python 解释器未找到: ${pythonPath}` });
            return;
        }

        // 检查 Python 脚本
        const pythonScript = command.split('"')[3];
        if (!fs.existsSync(pythonScript)) {
            console.error('Python script not found:', pythonScript);
            resolve({ code: 1, error: `Python 脚本未找到: ${pythonScript}` });
            return;
        }

        // 验证 Python 环境
        try {
            const { execSync } = require('child_process');
            const pythonVersion = execSync(`"${pythonPath}" --version`, { encoding: 'utf8' });
            console.log('Python version:', pythonVersion.trim());
        } catch (error) {
            console.error('Python version check failed:', error);
            resolve({ code: 1, error: `Python 环境验证失败: ${error.message}` });
            return;
        }

        // 调整命令执行选项
        const execOptions = {
            ...options,
            windowsHide: false,
            shell: true,
            maxBuffer: 1024 * 1024 * 10,
            cwd: workingDir,
            windowsVerbatimArguments: true,
            env: {
                ...options.env,
                ELECTRON_RUN_AS_NODE: '1',
                SystemRoot: process.env.SystemRoot || 'C:\\Windows',
                windir: process.env.SystemRoot || 'C:\\Windows',
                TEMP: process.env.TEMP || path.join(process.env.SystemRoot || 'C:\\Windows', 'Temp'),
                TMP: process.env.TMP || path.join(process.env.SystemRoot || 'C:\\Windows', 'Temp')
            }
        };

        const childProcess = spawn(command, execOptions, (error, stdout, stderr) => {
            if (error) {
                console.error('Command execution error:', error);
                console.error('Command:', command);
                console.error('Options:', execOptions);
                console.error('Stderr:', stderr);
                
                // 检查具体的错误类型
                if (stderr.includes('ImportError')) {
                    resolve({ code: error.code, error: `Python 包导入错误: ${stderr}` });
                } else if (stderr.includes('ModuleNotFoundError')) {
                    resolve({ code: error.code, error: `缺少必要的 Python 模块: ${stderr}` });
                } else if (error.code === 'EACCES') {
                    resolve({ code: error.code, error: '权限不足，请以管理员身份运行程序' });
                } else if (error.code === 'ENOENT') {
                    resolve({ code: error.code, error: '找不到指定的程序或命令' });
                } else if (error.code === 'EPERM') {
                    resolve({ code: error.code, error: '操作不被允许，可能需要更高权限' });
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
            console.error('Command:', command);
            console.error('Working directory:', workingDir);
            console.error('Python path:', pythonPath);
            console.error('Python script:', pythonScript);
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

// 获取 Python 可执行文件路径
function getPythonPath() {
    if (isDev) {
        return path.join(__dirname, 'resources', 'python_env', 'Scripts', 'python.exe');
    } else {
        return path.join(process.resourcesPath, 'resources', 'python_env', 'Scripts', 'python.exe');
    }
}

function getMainScript() {
    if (isDev) {
        return path.join(__dirname, 'resources', 'main.py');
    } else {
        return path.join(process.resourcesPath, 'resources', 'main.py');
    }
}