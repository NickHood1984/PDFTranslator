# Windows 打包指南

## 环境要求

1. Windows 10 或更高版本
2. Node.js 16 或更高版本
3. Python 3.10
4. Git（可选，用于克隆代码）

## 环境安装

1. **安装 Node.js**
   - 访问 https://nodejs.org/
   - 下载并安装 Node.js LTS 版本

2. **安装 Python**
   - 访问 https://www.python.org/downloads/
   - 下载并安装 Python 3.10
   - 安装时勾选 "Add Python to PATH"

## 打包步骤

1. **获取代码**
   ```bash
   git clone https://github.com/YourUsername/PDFTranslator.git
   cd PDFTranslator
   ```
   或者直接下载并解压代码

2. **运行打包脚本**
   - 双击运行 `build-win.bat`
   - 等待打包完成
   - 完成后，安装包会在 `dist` 目录下

## 注意事项

1. 确保有良好的网络连接，因为需要下载依赖
2. 确保有足够的磁盘空间（至少 2GB）
3. 如果遇到权限问题，请以管理员身份运行
4. 如果遇到网络问题，可以设置镜像：
   ```bash
   npm config set registry https://registry.npmmirror.com
   pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
   ```

## 常见问题

1. **Node.js 依赖安装失败**
   - 检查网络连接
   - 尝试清除 npm 缓存：`npm cache clean --force`
   - 删除 node_modules 目录后重试

2. **Python 依赖安装失败**
   - 检查网络连接
   - 尝试升级 pip：`python -m pip install --upgrade pip`
   - 确保 Python 版本正确

3. **构建失败**
   - 检查错误信息
   - 确保所有依赖都正确安装
   - 确保资源文件都存在

## 目录结构

```
PDFTranslator/
├── build-win.bat      # Windows 打包脚本
├── main.js            # Electron 主进程
├── main.py           # Python 主程序
├── package.json      # Node.js 配置
├── requirements.txt  # Python 依赖
├── resources/        # 资源目录
│   └── app/
│       ├── models/   # 模型文件
│       ├── python_env/ # Python 环境
│       └── config.json # 配置文件
└── dist/            # 构建输出目录
```
