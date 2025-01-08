#!/bin/bash

# 显示彩色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== 开始构建 Windows 应用 ===${NC}"

# 检查 Node.js
echo -e "${YELLOW}1. 检查 Node.js 安装...${NC}"
if ! command -v node &> /dev/null; then
    echo "错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 Python
echo -e "${YELLOW}2. 检查 Python 安装...${NC}"
if ! command -v python3 &> /dev/null; then
    echo "错误: 未找到 Python，请先安装 Python"
    exit 1
fi

# 创建 Python 虚拟环境
echo -e "${YELLOW}3. 创建 Python 虚拟环境...${NC}"
python3 -m venv python_env
source python_env/bin/activate

# 安装 Python 依赖
echo -e "${YELLOW}4. 安装 Python 依赖...${NC}"
python -m pip install --upgrade pip
pip install -r requirements.txt

# 下载模型
echo -e "${YELLOW}5. 下载模型...${NC}"
python download_model.py

# 准备构建资源
echo -e "${YELLOW}6. 准备构建资源...${NC}"
mkdir -p resources
cp -r python_env resources/python_env
cp -r models resources/models
cp -r local_models resources/local_models
cp config.json resources/
cp main.py resources/

# 安装 Node.js 依赖
echo -e "${YELLOW}7. 安装 Node.js 依赖...${NC}"
npm install

# 构建应用
echo -e "${YELLOW}8. 构建应用...${NC}"
npm run build:win

echo -e "${GREEN}=== 构建完成 ===${NC}"
echo -e "安装包位于 ${YELLOW}dist${NC} 目录下"
