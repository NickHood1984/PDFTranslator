const { ipcRenderer, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');

let userDataPath = '';
let store = null;
let resourcesPath = '';

// 初始化时获取资源路径
async function initializeApp() {
    try {
        // 从主进程获取用户数据路径和资源路径
        userDataPath = await ipcRenderer.invoke('get-user-data-path');
        resourcesPath = await ipcRenderer.invoke('get-resources-path');
        console.log('User data path:', userDataPath);
        console.log('Resources path:', resourcesPath);
        
        // 初始化 Store
        store = new Store({
            cwd: userDataPath
        });
        
        // 初始化配置
        await loadConfig();
        
        // 检查模型
        await checkModel();
        
        console.log('应用初始化完成');
    } catch (error) {
        console.error('初始化失败:', error);
        const statusDiv = document.getElementById('status');
        if (statusDiv) {
            statusDiv.textContent = `初始化失败: ${error.message}`;
            statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
            statusDiv.classList.remove('hidden');
        }
    }
}

// 修改 loadConfig 函数为异步函数
async function loadConfig() {
    try {
        const config = store.get('config') || {};
        const elements = {
            'source-lang': config.sourceLang || 'auto',
            'target-lang': config.targetLang || 'zh',
            'api-key': config.apiKey || '',
            'model-type': config.modelType || 'local'
        };
        
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.value = value;
            }
        }
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// 在 DOMContentLoaded 时初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    initializeApp().catch(error => {
        console.error('App initialization failed:', error);
    });
});

// 修改这部分，直接使用 path 模块
const PYTHON_DIR = path.join(process.resourcesPath, 'python');

// 修改判断开发环境的函数
function isDev() {
    // 检查是否在 electron 目录下运行
    return process.resourcesPath.includes('electron/dist');
}

// 修改获取脚本路径的函数
function getScriptPath(scriptName) {
    const isDevEnv = isDev();
    console.log('Current directory:', __dirname);
    
    if (isDevEnv) {
        return path.join(__dirname, scriptName);
    } else {
        // 在生产环境中，脚本应该在 app.asar.unpacked 中
        return path.join(process.resourcesPath, 'app.asar.unpacked', scriptName);
    }
}

let selectedOutputPath = '';
let selectedInputPath = '';

// 文件处理函数
function handleFileSelection(file) {
    const statusDiv = document.getElementById('status');
    const selectedFileDiv = document.getElementById('selectedFile');
    const outputPathInput = document.getElementById('outputPath');
    
    if (!file || !file.path) {
        statusDiv.textContent = '无效的文件';
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
        return;
    }

    try {
        if (!fs.existsSync(file.path)) {
            statusDiv.textContent = '所选文件不存在';
            statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
            statusDiv.classList.remove('hidden');
            return;
        }

        selectedInputPath = file.path;
        selectedFileDiv.textContent = `已选择: ${file.name}`;
        statusDiv.classList.add('hidden');

        // 设置默认输出目录为源文件所在目录
        const fileDir = path.dirname(file.path);
        selectedOutputPath = fileDir;
        outputPathInput.value = fileDir;
        
        // 启用转换按钮
        document.getElementById('convertButton').disabled = false;
    } catch (error) {
        console.error('Error processing file:', error);
        statusDiv.textContent = '文件处理出错';
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
    }
}

// 文件选择按钮点击处理
document.getElementById('fileInput').addEventListener('click', async () => {
    try {
        const filePath = await ipcRenderer.invoke('select-file');
        if (filePath) {
            document.getElementById('selectedFile').textContent = filePath;
            handleFileSelection({ path: filePath, name: path.basename(filePath) });
        }
    } catch (error) {
        console.error('File selection error:', error);
        showStatus('error', '文件选择出错：' + error.message);
    }
});

// 输出路径选择按钮点击处理
document.getElementById('browseButton').addEventListener('click', async () => {
    try {
        const dirPath = await ipcRenderer.invoke('select-directory');
        if (dirPath) {
            document.getElementById('outputPath').value = dirPath;
            selectedOutputPath = dirPath;
        }
    } catch (error) {
        console.error('Directory selection error:', error);
        showStatus('error', '输出路径选择出错：' + error.message);
    }
});

// 显示状态信息的辅助函数
function showStatus(type, message) {
    const statusDiv = document.getElementById('status');
    statusDiv.className = `rounded-md p-4 ${type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`;
    statusDiv.textContent = message;
    statusDiv.classList.remove('hidden');
}

// 修改加载配置函数
function loadConfig() {
    try {
        const config = store.get('config') || {};
        const elements = {
            'source-lang': config.sourceLang || 'auto',
            'target-lang': config.targetLang || 'zh',
            'api-key': config.apiKey || '',
            'model-type': config.modelType || 'local'
        };
        
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.value = value;
            }
        }
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// 修改保存配置函数
function saveConfig() {
    try {
        const config = {
            threadCount: parseInt(document.getElementById('threadCount').value),
            service: document.getElementById('service').value,
            outputFormat: document.getElementById('outputFormat').value
        };
        
        store.set('config', config);
        
        // 显示保存成功提示
        const settingsModal = document.getElementById('settingsModal');
        const statusDiv = document.getElementById('status');
        
        // 关闭设置窗口
        settingsModal.classList.add('hidden');
        
        // 显示成功提示
        statusDiv.textContent = '设置已保存';
        statusDiv.className = 'bg-green-100 text-success rounded-md p-4 transition-opacity duration-500';
        statusDiv.classList.remove('hidden');
        
        // 3秒后淡出提示
        setTimeout(() => {
            statusDiv.classList.add('opacity-0');
            setTimeout(() => {
                statusDiv.classList.add('hidden');
                statusDiv.classList.remove('opacity-0');
            }, 500);
        }, 3000);
        
        return true;
    } catch (error) {
        console.error('Error saving config:', error);
        
        // 显示错误提示
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = `保存设置失败: ${error.message}`;
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
        
        return false;
    }
}

// 修改模型检查函数
async function checkModel() {
    const isDevEnv = isDev();
    const modelDir = isDevEnv ? 
        path.join(__dirname, 'models', 'DocLayout-YOLO-DocStructBench-onnx') :
        path.join(process.resourcesPath, 'app.asar.unpacked', 'models', 'DocLayout-YOLO-DocStructBench-onnx');
    
    const modelStatus = document.getElementById('modelStatus');
    const downloadModelBtn = document.getElementById('downloadModelBtn');
    
    try {
        const modelPath = path.join(modelDir, 'model.onnx');
        const exists = fs.existsSync(modelPath);
        
        if (exists) {
            modelStatus.textContent = '模型已就绪';
            modelStatus.className = 'text-success';
            downloadModelBtn.classList.add('hidden');
            return true;
        } else {
            modelStatus.textContent = '模型未下载';
            modelStatus.className = 'text-error';
            downloadModelBtn.classList.remove('hidden');
            return false;
        }
    } catch (error) {
        modelStatus.textContent = '模型检查失败';
        modelStatus.className = 'text-error';
        downloadModelBtn.classList.remove('hidden');
        return false;
    }
}

// 下载模型
async function downloadModel() {
    const modelStatus = document.getElementById('modelStatus');
    const downloadModelBtn = document.getElementById('downloadModelBtn');
    const statusDiv = document.getElementById('status');
    
    try {
        downloadModelBtn.disabled = true;
        modelStatus.textContent = '正在下载模型...';
        modelStatus.className = 'text-primary';
        
        const pythonScript = getScriptPath('download_model.py');
        const pythonPath = getPythonPath();
        const pythonEnvPath = path.dirname(path.dirname(pythonPath));

        console.log('Starting model download...');
        console.log('Python executable:', pythonPath);
        console.log('Python script:', pythonScript);
        console.log('Python env path:', pythonEnvPath);

        // 验证文件存在
        if (!fs.existsSync(pythonPath)) {
            throw new Error(`Python解释器未找到: ${pythonPath}`);
        }
        if (!fs.existsSync(pythonScript)) {
            throw new Error(`下载脚本未找到: ${pythonScript}`);
        }

        const command = `"${pythonPath}" "${pythonScript}"`;
        console.log('Executing command:', command);
        
        const envVars = {
            ...process.env,
            VIRTUAL_ENV: pythonEnvPath,
            PATH: `${path.join(pythonEnvPath, 'bin')}${path.delimiter}${process.env.PATH}`,
            PYTHONPATH: path.join(pythonEnvPath, 'lib', 'python3.10'),
            PYTHONHOME: pythonEnvPath,
            PYTHONIOENCODING: 'utf-8',
            LANG: 'en_US.UTF-8',
            LC_ALL: 'en_US.UTF-8',
            PYTHONDONTWRITEBYTECODE: '1',
            PYTHONUNBUFFERED: '1',
            HF_ENDPOINT: 'https://hf-mirror.com'
        };

        console.log('Environment variables:', envVars);

        const { exec } = require('child_process');
        const childProcess = exec(command, { env: envVars });

        let downloadOutput = '';
        let errorOutput = '';

        childProcess.stdout.on('data', (data) => {
            downloadOutput += data;
            console.log(`Download output: ${data}`);
            modelStatus.textContent = data.toString().trim() || '正在下载...';
        });

        childProcess.stderr.on('data', (data) => {
            errorOutput += data;
            console.error(`Download error: ${data}`);
            if (!data.includes('it/s]')) {
                modelStatus.textContent = `下载错误: ${data}`;
                modelStatus.className = 'text-error';
            }
        });

        childProcess.on('close', async (code) => {
            console.log('Download process closed with code:', code);
            console.log('Full output:', downloadOutput);
            console.log('Error output:', errorOutput);

            if (code === 0) {
                console.log('Download completed successfully');
                const modelExists = await checkModel();
                if (modelExists) {
                    statusDiv.textContent = '模型下载成功';
                    statusDiv.className = 'bg-green-100 text-success rounded-md p-4';
                } else {
                    statusDiv.textContent = '模型下载可能未完成，请重试';
                    statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
                    downloadModelBtn.disabled = false;
                }
            } else {
                console.error('Download failed with code:', code);
                modelStatus.textContent = '模型下载失败';
                modelStatus.className = 'text-error';
                downloadModelBtn.disabled = false;
                statusDiv.textContent = '模型下载失败，请重试';
                statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
            }
            statusDiv.classList.remove('hidden');
        });

        childProcess.on('error', (error) => {
            console.error('Download process error:', error);
            modelStatus.textContent = `下载错误: ${error.message}`;
            modelStatus.className = 'text-error';
            downloadModelBtn.disabled = false;
            statusDiv.textContent = '模型下载出错';
            statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
            statusDiv.classList.remove('hidden');
        });

    } catch (error) {
        console.error('Download error:', error);
        modelStatus.textContent = `下载错误: ${error.message}`;
        modelStatus.className = 'text-error';
        downloadModelBtn.disabled = false;
        statusDiv.textContent = '模型下载出错';
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
    }
}

// 更新进度显示
function updateProgress(stage, percentage) {
    console.log('updateProgress called with stage:', stage, 'percentage:', percentage);

    const progressContainer = document.querySelector('.progress-container');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const progressStage = document.querySelector('.progress-stage');
    
    if (!progressContainer || !progressFill || !progressText || !progressStage) {
        console.error('Progress elements not found');
        return;
    }
    
    progressContainer.classList.remove('hidden');
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
    progressStage.textContent = stage;
    
    // 优化进度条样式
    progressFill.className = 'progress-fill bg-blue-500 transition-all duration-300 h-2';
    progressContainer.className = 'progress-container bg-gray-100 rounded-lg overflow-hidden h-2 mb-2';
    progressText.className = 'progress-text text-sm font-medium text-gray-600 mt-1';
    progressStage.className = 'progress-stage text-sm font-medium text-gray-700';
}

// 监听主进程发送的 'python-output' 事件
ipcRenderer.on('python-output', (event, data) => {
    console.log('Received python-output:', data.toString());
    const output = data.toString().trim();
    const statusDiv = document.getElementById('status');

    // 处理不同类型的输出
    if (output.includes('Stage:')) {
        const stage = output.split('Stage:')[1].trim();
        console.log('Processing stage:', stage);
        if (stage === '正在读取 PDF') {
            updateProgress(stage, 10);
        } else if (stage === '正在翻译') {
            updateProgress(stage, 30);
        }
    } else if (output.includes('转换成功')) {
        console.log('Conversion successful');
        statusDiv.className = 'bg-green-100 text-success rounded-md p-4';
        statusDiv.textContent = '转换成功！';
        updateProgress('完成', 100);
    } else if (output.includes('使用服务:')) {
        console.log('Service info:', output);
        const service = output.split('使用服务:')[1].trim();
        statusDiv.textContent = `使用${service}服务翻译`;
        statusDiv.className = 'bg-blue-100 text-primary rounded-md p-4';
        updateProgress(`正在使用${service}服务翻译`, 20);
    }
});

// 监听主进程发送的 'python-error' 事件
ipcRenderer.on('python-error', (event, data) => {
    console.log('Received stderr output:', data.toString());
    const statusDiv = document.getElementById('status');
    const output = data.toString().trim();

    // 处理进度条信息
    if (output.includes('%') && (output.includes('it/s') || output.includes('s/it'))) {
        // 这是tqdm进度条信息
        const match = output.match(/(\d+)%\|[█▉▊▋▌▍▎▏ ]+\| *(\d+)\/(\d+)/);
        if (match) {
            const percentage = parseInt(match[1]);
            const current = parseInt(match[2]);
            const total = parseInt(match[3]);
            // 将tqdm的进度映射到30-90之间
            const mappedPercentage = 30 + (percentage * 0.6);
            updateProgress(`正在翻译第 ${current}/${total} 页`, Math.round(mappedPercentage));
            return;
        }
    }

    // 处理阶段信息
    if (output.includes('开始执行转换')) {
        updateProgress('正在初始化...', 5);
        return;
    }
    if (output.includes('输入文件:')) {
        updateProgress('正在读取PDF...', 10);
        return;
    }
    if (output.includes('成功读取配置')) {
        updateProgress('正在初始化翻译...', 15);
        return;
    }
    if (output.includes('使用翻译服务:')) {
        const service = output.match(/使用翻译服务: (\w+)/)?.[1] || 'google';
        updateProgress(`正在连接${service}翻译服务...`, 20);
        return;
    }
    if (output.includes('PDF文件大小:')) {
        updateProgress('开始翻译...', 25);
        return;
    }
    if (output.includes('翻译完成')) {
        updateProgress('翻译完成，正在生成文件...', 95);
        return;
    }
    if (output.includes('生成文件大小')) {
        updateProgress('转换完成', 100);
        return;
    }

    // 处理调试信息
    if (output.includes('PDF文件大小') || 
        output.includes('成功读取配置') || 
        output.includes('翻译参数') || 
        output.includes('使用翻译服务') || 
        output.includes('翻译完成') || 
        output.includes('生成文件大小')) {
        console.log('Debug info:', output);
        return;
    }

    // 处理错误信息
    if (output && 
        !output.includes('it/s]') && 
        output.includes('错误') || 
        output.includes('Error') || 
        output.includes('失败')) {
        console.error('Error output:', output);
        statusDiv.textContent = `转换错误: ${output}`;
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
    }
});

// 监听主进程发送的进度信息
ipcRenderer.on('command-progress', (event, data) => {
    console.log('Received progress:', data);
    const output = data.toString().trim();

    // 处理进度条信息
    if (output.includes('%') && (output.includes('it/s') || output.includes('s/it'))) {
        // 这是tqdm进度条信息
        const match = output.match(/(\d+)%\|[█▉▊▋▌▍▎▏ ]+\| *(\d+)\/(\d+)/);
        if (match) {
            const percentage = parseInt(match[1]);
            const current = parseInt(match[2]);
            const total = parseInt(match[3]);
            // 将tqdm的进度映射到30-90之间
            const mappedPercentage = 30 + (percentage * 0.6);
            updateProgress(`正在翻译第 ${current}/${total} 页`, Math.round(mappedPercentage));
            return;
        }
    }

    // 处理阶段信息
    if (output.includes('开始执行转换')) {
        updateProgress('正在初始化...', 5);
    } else if (output.includes('输入文件:')) {
        updateProgress('正在读取PDF...', 10);
    } else if (output.includes('成功读取配置')) {
        updateProgress('正在初始化翻译...', 15);
    } else if (output.includes('使用翻译服务')) {
        const service = output.match(/使用翻译服务: (\w+)/)?.[1] || 'google';
        updateProgress(`正在连接${service}翻译服务...`, 20);
    } else if (output.includes('PDF文件大小:')) {
        updateProgress('开始翻译...', 25);
    } else if (output.includes('翻译完成')) {
        updateProgress('翻译完成，正在生成文件...', 95);
    } else if (output.includes('生成文件大小')) {
        updateProgress('转换完成', 100);
    }
});

async function executeCommand(command, options) {
    try {
        const pythonPath = getPythonPath();
        const pythonEnvPath = path.dirname(path.dirname(pythonPath));
        const pythonScriptsPath = path.join(pythonEnvPath, 'Scripts');
        const pythonDLLsPath = path.join(pythonEnvPath, 'DLLs');
        const pythonLibPath = path.join(pythonEnvPath, 'Lib');
        const pythonSitePackages = path.join(pythonLibPath, 'site-packages');

        // 构建完整的 PYTHONPATH
        const pythonPaths = [
            pythonEnvPath,
            pythonLibPath,
            pythonSitePackages,
            pythonDLLsPath,
            process.cwd()
        ].join(path.delimiter);

        // 构建完整的 PATH
        const pathEnv = [
            pythonScriptsPath,
            pythonEnvPath,
            process.env.PATH
        ].filter(Boolean).join(path.delimiter);

        const envVars = {
            ...process.env,
            PYTHONHOME: pythonEnvPath,
            PYTHONPATH: pythonPaths,
            PATH: pathEnv,
            PYTHONIOENCODING: 'utf-8',
            PYTHONUTF8: '1',
            PYTHONLEGACYWINDOWSFSENCODING: 'utf-8',
            PYTHONLEGACYWINDOWSSTDIO: '1',
            PYTHONDONTWRITEBYTECODE: '1',
            PYTHONUNBUFFERED: '1'
        };

        console.log('Environment variables:', {
            PYTHONHOME: envVars.PYTHONHOME,
            PYTHONPATH: envVars.PYTHONPATH,
            PATH: envVars.PATH
        });

        return await ipcRenderer.invoke('execute-command', command, {
            ...options,
            env: envVars,
            windowsHide: false,
            shell: true
        });
    } catch (error) {
        console.error('Command execution error:', error);
        throw error;
    }
}

// 修改转换按钮的事件处理
document.getElementById('convertButton').addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    const primaryButton = document.getElementById('convertButton');
    const progressContainer = document.querySelector('.progress-container');
    
    if (!await checkModel()) {
        statusDiv.textContent = '请先下载模型';
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
        return;
    }
    
    try {
        if (!selectedInputPath) {
            statusDiv.textContent = '请先选择一个 PDF 文件';
            statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
            statusDiv.classList.remove('hidden');
            return;
        }

        if (!selectedOutputPath) {
            statusDiv.textContent = '请选择输出位置';
            statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
            statusDiv.classList.remove('hidden');
            return;
        }

        primaryButton.disabled = true;
        document.getElementById('fileInput').disabled = true;
        document.getElementById('browseButton').disabled = true;

        progressContainer.classList.remove('hidden');
        updateProgress('准备开始...', 0);
        statusDiv.classList.add('hidden');
        
        const pythonScript = getScriptPath('main.py');
        const pythonPath = getPythonPath();
        
        console.log('Python executable:', pythonPath);
        console.log('Python script:', pythonScript);
        
        if (!fs.existsSync(pythonPath)) {
            throw new Error(`Python 解释器未找到: ${pythonPath}`);
        }

        if (!fs.existsSync(pythonScript)) {
            throw new Error(`Python 脚本未找到: ${pythonScript}`);
        }

        const configPath = path.join(userDataPath, 'config.json');
        const outputBasePath = path.join(selectedOutputPath, path.basename(selectedInputPath, '.pdf'));
        
        // 修改命令构建方式
        const command = `"${pythonPath}" "${pythonScript}" "${selectedInputPath}" "${outputBasePath}" "${configPath}"`;
        
        console.log('Executing command:', command);

        // 使用新的执行函数
        const result = await executeCommand(command, {});
        
        // 处理主进程返回的结果
        if (result.code === 0) {
            const dualPath = `${outputBasePath}_双语.pdf`;
            const monoPath = `${outputBasePath}_译文.pdf`;

            if (fs.existsSync(dualPath) || fs.existsSync(monoPath)) {
                statusDiv.innerHTML = `
                    <div class="flex flex-col gap-4">
                        <div class="text-success font-medium">转换完成</div>
                        <div class="flex gap-2">
                            ${fs.existsSync(dualPath) ? 
                                `<button onclick="openPDF('${dualPath.replace(/'/g, "\\'")}')" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                                    打开双语版本
                                </button>` : ''
                            }
                            ${fs.existsSync(monoPath) ? 
                                `<button onclick="openPDF('${monoPath.replace(/'/g, "\\'")}')" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                                    打开译文版本
                                </button>` : ''
                            }
                        </div>
                    </div>
                `;
                statusDiv.className = 'bg-green-50 rounded-lg p-4 shadow-sm';
            }
        } else {
            statusDiv.textContent = '转换失败';
            statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        }

        primaryButton.disabled = false;
        document.getElementById('fileInput').disabled = false;
        document.getElementById('browseButton').disabled = false;
        progressContainer.classList.add('hidden');

    } catch (error) {
        console.error('Conversion error:', error);
        statusDiv.textContent = `转换出错: ${error.message}`;
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
        
        primaryButton.disabled = false;
        document.getElementById('fileInput').disabled = false;
        document.getElementById('browseButton').disabled = false;
        progressContainer.classList.add('hidden');
    }
});

// 设置相关的事件处理
document.getElementById('settingsButton').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('hidden');
    loadConfig();
});

document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.add('hidden');
});

document.getElementById('saveSettings').addEventListener('click', () => {
    saveConfig();
});

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    const modal = document.getElementById('settingsModal');
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
});

// 线程数滑块值显示
document.getElementById('threadCount').addEventListener('input', (e) => {
    document.getElementById('threadValue').textContent = e.target.value;
});

// 拖放处理
const fileInputWrapper = document.querySelector('.file-input-wrapper');

fileInputWrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputWrapper.classList.add('border-primary', 'bg-blue-50');
});

fileInputWrapper.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputWrapper.classList.remove('border-primary', 'bg-blue-50');
});

fileInputWrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    fileInputWrapper.classList.remove('border-primary', 'bg-blue-50');
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
        handleFileSelection({
            name: file.name,
            path: file.path
        });
    } else {
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = '请选择 PDF 文件';
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
    }
});

// 下载按钮事件监听器
document.getElementById('downloadModelBtn').addEventListener('click', downloadModel);

// 修改 getPythonPath 函数
function getPythonEnvPath() {
    const isDevEnv = !process.resourcesPath?.includes('app.asar');
    console.log('开发环境:', isDevEnv);
    console.log('资源路径:', process.resourcesPath);
    
    let pythonEnvPath;
    if (isDevEnv) {
        // 开发环境
        pythonEnvPath = path.join(process.cwd(), 'python_env');
    } else {
        // 生产环境
        pythonEnvPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env');
    }
    
    console.log('Python 环境路径:', pythonEnvPath);
    return pythonEnvPath;
}

function getPythonPath() {
    if (!resourcesPath) {
        throw new Error('Resources path not initialized');
    }
    
    const pythonEnvPath = path.join(resourcesPath, 'app.asar.unpacked', 'python_env');
    
    // 检查多个可能的 Python 路径
    const possiblePaths = [
        path.join(pythonEnvPath, 'python.exe'),
        path.join(pythonEnvPath, 'Scripts', 'python.exe'),
        path.join(resourcesPath, 'app.asar.unpacked', 'python_env', 'python.exe'),
        path.join(resourcesPath, 'app.asar.unpacked', 'python_env', 'Scripts', 'python.exe')
    ];
    
    console.log('检查 Python 路径:', possiblePaths);
    
    for (const pythonPath of possiblePaths) {
        console.log('测试 Python 路径:', pythonPath);
        if (fs.existsSync(pythonPath)) {
            console.log('找到 Python 路径:', pythonPath);
            return pythonPath;
        }
    }
    
    throw new Error('未找到 Python 解释器，已检查以下路径：\n' + possiblePaths.join('\n'));
}

// 添加打开PDF文件的函数
function openPDF(filePath) {
    console.log('Opening PDF:', filePath);
    shell.openPath(filePath).catch(err => {
        console.error('Error opening PDF:', err);
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = `打开文件失败: ${err.message}`;
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
    });
}

// 将openPDF函数添加到window对象，使其可以从HTML中调用
window.openPDF = openPDF;

// 在文件顶部添加
let isInitialized = false;

// 修改初始化函数
async function initialize() {
    if (isInitialized) return;
    
    try {
        await loadConfig();
        await checkModel();
        isInitialized = true;
    } catch (error) {
        console.error('初始化失败:', error);
    }
}

// 延迟加载非关键资源
document.addEventListener('DOMContentLoaded', () => {
    // 立即显示UI
    document.body.style.visibility = 'visible';
    
    // 延迟初始化
    setTimeout(initialize, 100);
    
    // 设置事件监听器
    setupEventListeners();
});

// 将事件监听器设置分离出来
function setupEventListeners() {
    // ... 原有的事件监听器代码 ...
}

// 获取Python可执行文件路径
function getPythonExecutable() {
    const isWindows = process.platform === 'win32';
    const pythonPath = isWindows 
        ? path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env', 'python.exe')
        : path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env', 'bin', 'python3');
    return pythonPath;
}

// 获取配置文件路径
function getConfigPath() {
    const userDataPath = app.getPath('userData');
    return path.join(userDataPath, 'config.json');
} 