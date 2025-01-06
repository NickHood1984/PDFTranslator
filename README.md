# PDF翻译工具

一个基于Electron和Python的PDF文献翻译工具，支持PDF文档的智能分析和翻译。

## 功能特点

- PDF文档智能布局分析
- 多语言翻译支持
- 友好的用户界面
- 跨平台支持 (Windows, macOS)

## 开发环境要求

- Node.js >= 16
- Python 3.10
- Conda (推荐)

## 安装步骤

1. 克隆仓库：
```bash
git clone [repository-url]
cd pdf-translator
```

2. 安装Node.js依赖：
```bash
npm install
```

3. 创建并配置Python环境：
```bash
conda create -n pdftranlate python=3.10
conda activate pdftranlate
pip install -r requirements.txt
```

4. 下载模型文件：
```bash
python download_model.py
```

## 开发模式运行

```bash
# 设置开发环境
export NODE_ENV=development  # Linux/macOS
# 或
set NODE_ENV=development    # Windows

# 启动应用
npm start
```

## 构建应用

```bash
# macOS
npm run build:mac

# Windows
npm run build:win
```

## 注意事项

- 首次运行前请确保已下载所需的模型文件
- 确保Python环境中已安装所有必要的依赖
- 在Windows环境下构建时需要安装相应的构建工具

## 许可证

MIT License 