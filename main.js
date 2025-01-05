const { app, BrowserWindow, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// 在创建窗口之前设置环境变量
process.env.HF_ENDPOINT = 'https://hf-mirror.com';

let mainWindow = null;

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        backgroundColor: '#F9FAFB',
        show: false
    });

    // 加载应用的 index.html
    mainWindow.loadFile('index.html')
        .then(() => {
            console.log('Window loaded successfully');
        })
        .catch(err => {
            console.error('Error loading window:', err);
        });
    
    // 当窗口准备好时再显示
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // 监听窗口关闭事件
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // 处理选择保存位置的请求
    ipcMain.handle('select-save-path', async (event, options) => {
        return dialog.showOpenDialog(mainWindow, {
            ...options,
            properties: ['openDirectory', 'createDirectory']
        });
    });

    // 添加文件选择对话框
    ipcMain.handle('select-file', async () => {
        return dialog.showOpenDialog(mainWindow, {
            properties: ['openFile'],
            filters: [
                { name: 'PDF Files', extensions: ['pdf'] }
            ]
        });
    });

    // 监听渲染进程的 'execute-command' 请求
    ipcMain.handle('execute-command', async (event, command, options) => {
        console.log('Received execute-command request.');
        console.log('Command:', command);
        console.log('Options:', options);

        return new Promise((resolve, reject) => {
            let errorOutput = '';
            const childProcess = exec(command, {
                ...options,
                windowsHide: true
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
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
    console.log('App is ready');
    createWindow();
}).catch(err => {
    console.error('Error during app initialization:', err);
});

// 当所有窗口关闭时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// 添加错误处理
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    dialog.showErrorBox('错误', `发生未知错误: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// 获取用户数据路径
ipcMain.handle('get-user-data-path', () => {
    return app.getPath('userData');
}); 