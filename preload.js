const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFile: () => ipcRenderer.invoke('select-file'),
    selectDirectory: () => ipcRenderer.invoke('select-directory'),
    executeCommand: (command, options) => ipcRenderer.invoke('execute-command', command, options),
    getUserDataPath: () => ipcRenderer.invoke('get-user-data-path'),
    onPythonOutput: (callback) => ipcRenderer.on('python-output', callback),
    onPythonError: (callback) => ipcRenderer.on('python-error', callback),
    path: {
        basename: path.basename,
        dirname: path.dirname,
        join: path.join
    },
    fs: {
        existsSync: fs.existsSync,
        writeFileSync: fs.writeFileSync,
        readFileSync: fs.readFileSync
    },
    process: {
        platform: process.platform,
        resourcesPath: process.resourcesPath,
        env: process.env
    }
}); 