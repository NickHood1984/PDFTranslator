#!/bin/bash

# 检测操作系统
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows环境
    echo "检测到Windows环境..."
    PYTHON_CMD="python"
    VENV_PYTHON="python_env\\Scripts\\python.exe"
    VENV_PIP="python_env\\Scripts\\pip.exe"
    ACTIVATE_CMD="python_env\\Scripts\\activate"
    SITE_PACKAGES="python_env\\Lib\\site-packages"
else
    # Unix环境
    echo "检测到Unix环境..."
    # 检查是否安装了Python 3.10
    if ! command -v python3.10 &> /dev/null; then
        echo "未找到Python 3.10，正在使用brew安装..."
        brew install python@3.10
        echo "Python 3.10安装完成"
    fi
    
    PYTHON_CMD="python3.10"
    VENV_PYTHON="python_env/bin/python3"
    VENV_PIP="python_env/bin/pip"
    ACTIVATE_CMD="source python_env/bin/activate"
    SITE_PACKAGES="python_env/lib/python3.10/site-packages"
fi

# 清理旧的虚拟环境
echo "清理旧的虚拟环境..."
rm -rf python_env

# 创建新的Python虚拟环境
echo "创建Python虚拟环境..."
$PYTHON_CMD -m venv python_env

# 确保虚拟环境中包含标准库
if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "win32" ]]; then
    # 获取系统Python的标准库路径
    PYTHON_LIB=$($PYTHON_CMD -c "import sysconfig; print(sysconfig.get_path('stdlib'))")
    PYTHON_DYNLOAD=$($PYTHON_CMD -c "import sysconfig; print(sysconfig.get_path('platlib'))")
    
    # 设置虚拟环境中的目标路径
    VENV_LIB="python_env/lib/python3.10"
    echo "复制Python标准库从 $PYTHON_LIB 到 $VENV_LIB ..."
    
    # 创建必要的目录
    mkdir -p "$VENV_LIB"
    mkdir -p "$VENV_LIB/lib-dynload"
    
    # 复制标准库文件
    echo "复制标准库文件..."
    cp -r "$PYTHON_LIB"/* "$VENV_LIB"/ || true
    
    # 复制动态库文件
    echo "复制动态库文件..."
    cp -r "$PYTHON_DYNLOAD"/* "$VENV_LIB/lib-dynload"/ || true
    
    # 特别确保encodings模块存在
    echo "确保encodings模块存在..."
    ENCODINGS_SRC="$PYTHON_LIB/encodings"
    ENCODINGS_DST="$VENV_LIB/encodings"
    if [ -d "$ENCODINGS_SRC" ]; then
        mkdir -p "$ENCODINGS_DST"
        cp -r "$ENCODINGS_SRC"/* "$ENCODINGS_DST"/ || true
    else
        echo "警告: 在系统Python中找不到encodings模块"
    fi
fi

# 激活虚拟环境
echo "激活虚拟环境..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source $ACTIVATE_CMD
else
    $ACTIVATE_CMD
fi

# 升级pip
echo "升级pip..."
python -m pip install --upgrade pip

# 安装依赖
echo "安装依赖..."
pip install -r requirements.txt

# 验证Python环境
echo "验证Python环境..."
python -c "
import sys
print('Python版本:', sys.version)
print('sys.prefix:', sys.prefix)
print('sys.base_prefix:', sys.base_prefix)
print('sys.path:', sys.path)
print('标准库路径:', sys.prefix + '/lib/python3.10')
import site
print('site模块已加载')
import encodings
print('encodings模块已加载')
import os
print('os模块已加载')
"

# 列出已安装的包
echo "已安装的包:"
pip list

# 退出虚拟环境
deactivate

echo "开发环境设置完成！" 