const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const url = require('url');

const isDev = process.env.NODE_ENV === 'development';

// 在创建窗口之前设置环境变量
process.env.HF_ENDPOINT = 'https://hf-mirror.com';

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // 使用 file 协议加载
    const startUrl = `file://${__dirname}/index.html`;
    mainWindow.loadURL(startUrl)
        .then(() => {
            console.log('Window loaded successfully');
            // 打开开发者工具以便调试
            mainWindow.webContents.openDevTools();
        })
        .catch(err => {
            console.error('Error loading window:', err);
        });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
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
    console.log('Received execute-command request.');
    console.log('Command:', command);
    console.log('Options:', options);

    return new Promise((resolve, reject) => {
        // 处理Python环境路径
        const pythonEnvPath = isDev ? 
            '/opt/homebrew/anaconda3/envs/pdftranlate' : 
            path.join(process.resourcesPath, 'python_env');
        
        const pythonExecutable = process.platform === 'win32' ? 
            path.join(pythonEnvPath, 'Scripts', 'python.exe') :
            path.join(pythonEnvPath, 'bin', 'python3');

        // 修改命令以使用正确的Python路径
        const modifiedCommand = isDev ? 
            command : 
            command.replace(/^python/, `"${pythonExecutable}"`);

        let errorOutput = '';
        const envConfig = isDev ? {
            ...process.env,
            PYTHONIOENCODING: 'utf-8',
            PATH: `${path.join(pythonEnvPath, 'bin')}:${process.env.PATH}`
        } : {
            ...process.env,
            PYTHONPATH: path.join(pythonEnvPath, 'lib', 'python3.10'),
            PYTHONHOME: pythonEnvPath,
            PYTHONIOENCODING: 'utf-8',
            PATH: `${path.join(pythonEnvPath, 'bin')}:${process.env.PATH}`
        };

        const childProcess = exec(modifiedCommand, {
            ...options,
            windowsHide: true,
            env: envConfig
        });

        childProcess.stdout.on('data', (data) => {
            console.log('Python stdout:', data.toString());
            mainWindow.webContents.send('python-output', data.toString());
        });

        childProcess.stderr.on('data', (data) => {
            console.log('Python stderr:', data.toString());
            mainWindow.webContents.send('python-error', data.toString());
        });

        childProcess.on('close', (code) => {
            console.log('Python process closed with code:', code);
            resolve({ code, errorOutput });
        });

        childProcess.on('error', (error) => {
            console.error('Python process error:', error);
            reject(error);
        });
    });
});

// 获取用户数据路径
ipcMain.handle('get-user-data-path', () => {
    return app.getPath('userData');
});

// 添加错误处理
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    dialog.showErrorBox('错误', `发生未知错误: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 