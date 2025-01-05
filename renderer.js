const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

let userDataPath = '';
ipcRenderer.invoke('get-user-data-path').then(path => {
    userDataPath = path;
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
        return path.join(process.resourcesPath, scriptName);
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

// 修改默认配置对象
let config = {
    "service": "google",
    "thread": 4,
    "lang_in": "en",
    "lang_out": "zh",
    "proxy": "",
    "google": {
        "url": "translate.googleapis.com"
    },
    "azure": {
        "endpoint": "https://api.translator.azure.cn",
        "api_key": ""
    },
    "deepl": {
        "auth_key": "",
        "url": "api-free.deepl.com"
    },
    "openai": {
        "api_key": "",
        "model": "gpt-3.5-turbo"
    },
    "zhipu": {
        "api_key": "",
        "model": "glm-3-turbo"
    },
    "deepseek": {
        "api_key": "",
        "model": "deepseek-chat"
    }
};

// 修改加载配置函数
function loadConfig() {
    try {
        const configPath = path.join(userDataPath, 'config.json');
        let defaultConfig = {
            "service": "google",
            "thread": 4,
            "lang_in": "en",
            "lang_out": "zh",
            "proxy": "",
            "google": {
                "url": "translate.googleapis.com"
            },
            "azure": {
                "endpoint": "https://api.translator.azure.cn",
                "api_key": ""
            },
            "deepl": {
                "auth_key": "",
                "url": "api-free.deepl.com"
            },
            "openai": {
                "api_key": "",
                "model": "gpt-3.5-turbo"
            },
            "zhipu": {
                "api_key": "",
                "model": "glm-3-turbo"
            },
            "deepseek": {
                "api_key": "",
                "model": "deepseek-chat"
            }
        };

        let config = defaultConfig;
        
        // 如果配置文件存在，则读取并合并配置
        if (fs.existsSync(configPath)) {
            const savedConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            config = { ...defaultConfig, ...savedConfig };
        } else {
            // 如果配置文件不存在，创建新的配置文件
            fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4));
        }

        // 设置UI状态
        const serviceRadio = document.querySelector(`input[name="service"][value="${config.service}"]`);
        if (serviceRadio) serviceRadio.checked = true;

        const threadCount = document.getElementById('threadCount');
        const threadValue = document.getElementById('threadValue');
        if (threadCount) threadCount.value = config.thread;
        if (threadValue) threadValue.textContent = config.thread;

        const langIn = document.getElementById('langIn');
        if (langIn) langIn.value = config.lang_in;

        const proxyUrl = document.getElementById('proxyUrl');
        if (proxyUrl) proxyUrl.value = config.proxy || '';

        // Azure 设置
        const azureEndpoint = document.getElementById('azureEndpoint');
        const azureApiKey = document.getElementById('azureApiKey');
        if (azureEndpoint) azureEndpoint.value = config.azure?.endpoint || '';
        if (azureApiKey) azureApiKey.value = config.azure?.api_key || '';

        // DeepL 设置
        const deeplAuthKey = document.getElementById('deeplAuthKey');
        if (deeplAuthKey) deeplAuthKey.value = config.deepl?.auth_key || '';

        // OpenAI 设置
        const openaiApiKey = document.getElementById('openaiApiKey');
        const openaiModel = document.getElementById('openaiModel');
        if (openaiApiKey) openaiApiKey.value = config.openai?.api_key || '';
        if (openaiModel) openaiModel.value = config.openai?.model || '';

        // 智谱AI 设置
        const zhipuApiKey = document.getElementById('zhipuApiKey');
        const zhipuModel = document.getElementById('zhipuModel');
        if (zhipuApiKey) zhipuApiKey.value = config.zhipu?.api_key || '';
        if (zhipuModel) zhipuModel.value = config.zhipu?.model || '';

        // DeepSeek 设置
        const deepseekApiKey = document.getElementById('deepseekApiKey');
        const deepseekModel = document.getElementById('deepseekModel');
        if (deepseekApiKey) deepseekApiKey.value = config.deepseek?.api_key || '';
        if (deepseekModel) deepseekModel.value = config.deepseek?.model || '';

        return config;
    } catch (error) {
        console.error('Error loading config:', error);
        return null;
    }
}

// 修改保存配置函数
function saveConfig() {
    try {
        const serviceRadio = document.querySelector('input[name="service"]:checked');
        const threadCount = document.getElementById('threadCount');
        const langIn = document.getElementById('langIn');
        const proxyUrl = document.getElementById('proxyUrl');

        const config = {
            service: serviceRadio?.value || 'google',
            thread: parseInt(threadCount?.value || '4'),
            lang_in: langIn?.value || 'en',
            lang_out: "zh",
            proxy: proxyUrl?.value || '',
            azure: {
                endpoint: document.getElementById('azureEndpoint')?.value || '',
                api_key: document.getElementById('azureApiKey')?.value || ''
            },
            deepl: {
                auth_key: document.getElementById('deeplAuthKey')?.value || '',
                url: "api-free.deepl.com"
            },
            openai: {
                api_key: document.getElementById('openaiApiKey')?.value || '',
                model: document.getElementById('openaiModel')?.value || ''
            },
            zhipu: {
                api_key: document.getElementById('zhipuApiKey')?.value || '',
                model: document.getElementById('zhipuModel')?.value || ''
            },
            deepseek: {
                api_key: document.getElementById('deepseekApiKey')?.value || '',
                model: document.getElementById('deepseekModel')?.value || ''
            }
        };

        // 保存到用户数据目录
        const configPath = path.join(userDataPath, 'config.json');
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));

        return true;
    } catch (error) {
        console.error('Error saving config:', error);
        return false;
    }
}

// 修改模型检查函数
async function checkModel() {
    const isDevEnv = isDev();
    // 使用当前目录作为基准
    const modelDir = path.join(__dirname, 'models', 'DocLayout-YOLO-DocStructBench-onnx');
    
    console.log('Is Dev:', isDevEnv);
    console.log('Model path:', modelDir);
    console.log('Current directory:', __dirname);
    
    const modelStatus = document.getElementById('modelStatus');
    const downloadModelBtn = document.getElementById('downloadModelBtn');
    
    try {
        if (fs.existsSync(modelDir)) {
            console.log('Model directory exists');
            const files = fs.readdirSync(modelDir);
            console.log('Files in model directory:', files);
            const onnxFiles = files.filter(file => file.endsWith('.onnx'));
            
            if (onnxFiles.length > 0) {
                console.log('Found ONNX files:', onnxFiles);
                modelStatus.textContent = '模型已下载';
                modelStatus.classList.add('text-success');
                downloadModelBtn.classList.add('hidden');
                return true;
            }
        }
        
        console.log('Model directory not found or no ONNX files');
        modelStatus.textContent = '模型未下载';
        modelStatus.classList.add('text-error');
        downloadModelBtn.classList.remove('hidden');
        return false;
    } catch (error) {
        console.error('Error checking model:', error);
        modelStatus.textContent = '模型检查失败';
        modelStatus.classList.add('text-error');
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
        
        const pythonScript = path.join(__dirname, 'download_model.py');
        const pythonExe = isDev() ? 
            '/opt/homebrew/anaconda3/envs/pdftranlate/bin/python3' :
            path.join(process.resourcesPath, 'python_env', 'bin', 'python3');

        console.log('Python executable:', pythonExe);
        console.log('Python script:', pythonScript);

        const command = `"${pythonExe}" "${pythonScript}"`;
        console.log('Executing command:', command);
        
        const { exec } = require('child_process');
        const childProcess = exec(command, {
            env: isDev() ? {
                ...process.env,  // 只使用当前环境变量
                HF_ENDPOINT: 'https://hf-mirror.com'
            } : {
                ...process.env,
                PYTHONPATH: path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env', 'lib', 'python3.10', 'site-packages'),
                PYTHONHOME: path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env'),
                PATH: `${path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env', 'bin')}:${process.env.PATH}`,
                HF_ENDPOINT: 'https://hf-mirror.com'
            }
        });

        childProcess.stdout.on('data', (data) => {
            console.log(`Download output: ${data}`);
            modelStatus.textContent = data.toString().trim();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Download error: ${data}`);
            if (!data.includes('it/s]')) {
                modelStatus.textContent = `下载错误: ${data}`;
                modelStatus.classList.add('text-error');
            }
        });

        childProcess.on('close', (code) => {
            if (code === 0) {
                checkModel();
            } else {
                modelStatus.textContent = '模型下载失败';
                modelStatus.classList.add('text-error');
                downloadModelBtn.disabled = false;
                statusDiv.textContent = '模型下载失败，请重试';
                statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
                statusDiv.classList.remove('hidden');
            }
        });

    } catch (error) {
        console.error('Download error:', error);
        modelStatus.textContent = `下载错误: ${error.message}`;
        modelStatus.classList.add('text-error');
        downloadModelBtn.disabled = false;
        statusDiv.textContent = '模型下载出错';
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
    }
}

// 更新进度显示
function updateProgress(stage) {
    console.log('updateProgress called with stage:', stage);

    const progressContainer = document.querySelector('.progress-container');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const progressStage = document.querySelector('.progress-stage');
    
    progressContainer.classList.remove('hidden');
    
    // 从进度信息中提取百分比
    let progress = 0;
    const percentMatch = stage.match(/(\d+)%/);
    if (percentMatch) {
        progress = parseInt(percentMatch[1]);
        progressStage.textContent = stage;
    } else {
        switch (true) {
            case stage.includes('正在读取 PDF'):
                progress = 20;
                progressStage.textContent = '正在读取 PDF';
                break;
            case stage.includes('正在解析内容'):
                progress = 40;
                progressStage.textContent = '正在解析内容';
                break;
            case stage.includes('正在翻译'):
                progress = 60;
                progressStage.textContent = '正在翻译';
                break;
            case stage.includes('完成'):
                progress = 100;
                progressStage.textContent = '翻译完成';
                break;
            default:
                // 保持当前进度，只更新状态文本
                const currentWidth = progressFill.style.width;
                progress = parseInt(currentWidth) || 0;
                progressStage.textContent = stage;
        }
    }
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    
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
        updateProgress(stage);
    } else if (output.includes('转换成功')) {
        console.log('Conversion successful');
        statusDiv.className = 'bg-green-100 text-success rounded-md p-4';
        statusDiv.textContent = '转换成功！';
        updateProgress('完成');
    } else if (output.includes('使用服务:')) {
        console.log('Service info:', output);
        const service = output.split('使用服务:')[1].trim();
        statusDiv.textContent = `使用${service}服务翻译`;
        statusDiv.className = 'bg-blue-100 text-primary rounded-md p-4';
    } else if (output.includes('错误堆栈:')) {
        console.error('Error stack:', output);
        statusDiv.textContent = `转换错误: ${output.split('错误堆栈:')[1].trim()}`;
        statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
        statusDiv.classList.remove('hidden');
    } else {
        console.log('Other output:', output);
    }
});

// 监听主进程发送的 'python-error' 事件
ipcRenderer.on('python-error', (event, data) => {
    console.log('Received stderr output:', data.toString());
    const statusDiv = document.getElementById('status');
    const output = data.toString().trim();

    // 处理进度条信息
    if (output.includes('%') && (output.includes('it/s') || output.includes('s/it'))) {
        // 这是进度条信息，不是错误
        const match = output.match(/(\d+)%/);
        if (match) {
            const percentage = parseInt(match[1]);
            updateProgress(`正在翻译... ${percentage}%`);
        }
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

    // 处理真正的错误信息
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

// 转换按钮点击事件
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
        statusDiv.textContent = '准备开始转换...';
        statusDiv.className = 'bg-blue-100 text-primary rounded-md p-4';
        statusDiv.classList.remove('hidden');
        
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

        // 构建输出文件路径
        const inputFileName = path.basename(selectedInputPath, '.pdf');
        const outputBasePath = path.join(selectedOutputPath, inputFileName);

        const command = `"${pythonPath}" "${pythonScript}" "${selectedInputPath}" "${outputBasePath}" "${configPath}"`;
        console.log('Executing command:', command);

        // 显示初始状态
        statusDiv.textContent = '准备开始转换...';
        statusDiv.className = 'bg-blue-100 text-primary rounded-md p-4';
        statusDiv.classList.remove('hidden');

        // 设置初始进度
        updateProgress('正在初始化...');

        // 修改环境变量设置
        const envVars = isDev() ? {
            ...process.env,  // 只使用当前环境变量
            HF_ENDPOINT: 'https://hf-mirror.com'
        } : {
            ...process.env,
            PYTHONPATH: path.join(process.resourcesPath, 'python_env', 'lib', 'python3.9', 'site-packages'),
            PYTHONHOME: path.join(process.resourcesPath, 'python_env'),
            PATH: `${path.join(process.resourcesPath, 'python_env', 'bin')}:${process.env.PATH}`,
            HF_ENDPOINT: 'https://hf-mirror.com'
        };

        // 将执行命令的请求发送到主进程
        ipcRenderer.invoke('execute-command', command, { env: envVars }).then((result) => {
            console.log('Command execution result:', result);
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
                                    `<button onclick="shell.openPath('${dualPath}')" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
                                        打开双语版本
                                    </button>` : ''
                                }
                                ${fs.existsSync(monoPath) ? 
                                    `<button onclick="shell.openPath('${monoPath}')" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
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
        }).catch((error) => {
            console.error('Error executing command:', error);
            statusDiv.textContent = `转换出错: ${error.message}`;
            statusDiv.className = 'bg-red-100 text-error rounded-md p-4';
            statusDiv.classList.remove('hidden');
            
            primaryButton.disabled = false;
            document.getElementById('fileInput').disabled = false;
            document.getElementById('browseButton').disabled = false;
            progressContainer.classList.add('hidden');
        });

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
    if (saveConfig()) {
        document.getElementById('settingsModal').classList.add('hidden');
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = '设置已保存';
        statusDiv.className = 'bg-green-100 text-success rounded-md p-4';
        statusDiv.classList.remove('hidden');
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 2000);
    }
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
function getPythonPath() {
    const isDevEnv = isDev();
    let pythonPath;
    
    if (isDevEnv) {
        // 开发环境使用 conda 环境
        pythonPath = '/opt/homebrew/anaconda3/envs/pdftranlate/bin/python3';
        console.log('Using development Python path:', pythonPath);
    } else {
        // 生产环境使用打包的 Python
        pythonPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'python_env', 'bin', 'python3');
        console.log('Using production Python path:', pythonPath);
    }
    
    console.log('Environment Info:');
    console.log('Is Dev:', isDevEnv);
    console.log('App Path:', process.resourcesPath);
    console.log('Python Path:', pythonPath);
    console.log('Working Directory:', process.cwd());
    
    // 检查文件是否存在
    if (!fs.existsSync(pythonPath)) {
        console.error('Python Path Error:');
        console.error(`Python interpreter not found at: ${pythonPath}`);
        
        // 尝试备用路径
        const altPath = isDevEnv ? pythonPath : path.join(process.resourcesPath, 'python_env', 'bin', 'python3');
        if (fs.existsSync(altPath)) {
            console.log('Found Python at alternate path:', altPath);
            return altPath;
        }
        
        // 列出资源目录内容以便调试
        try {
            console.log('Contents of Resources directory:');
            const resourcesContents = fs.readdirSync(process.resourcesPath);
            console.log(resourcesContents);
            
            if (!isDevEnv) {
                // 检查 app.asar.unpacked 目录
                const unpackedPath = path.join(process.resourcesPath, 'app.asar.unpacked');
                if (fs.existsSync(unpackedPath)) {
                    console.log('Contents of app.asar.unpacked directory:');
                    const unpackedContents = fs.readdirSync(unpackedPath);
                    console.log(unpackedContents);
                }
            }
        } catch (err) {
            console.error('Error listing directories:', err);
        }
        
        throw new Error(`Python interpreter not found at: ${pythonPath}`);
    }
    
    return pythonPath;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();
    checkModel();
}); 