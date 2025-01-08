@echo off
echo === 开始构建 Windows 应用 ===

echo 1. 检查 Node.js 安装...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未找到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

echo 2. 检查 Python 安装...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未找到 Python，请先安装 Python
    pause
    exit /b 1
)

echo 3. 创建 Python 虚拟环境...
if not exist "python_env" (
    python -m venv python_env
)

echo 4. 安装 Python 依赖...
call python_env\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [错误] Python 依赖安装失败
    pause
    exit /b 1
)

echo 5. 安装 Node.js 依赖...
call npm install
if %errorlevel% neq 0 (
    echo [错误] Node.js 依赖安装失败
    pause
    exit /b 1
)

echo 6. 准备构建资源...
if not exist "resources\app" mkdir resources\app
xcopy /E /I /Y python_env resources\app\python_env
xcopy /E /I /Y models resources\app\models
copy config.json resources\app\
copy main.py resources\app\

echo 7. 构建应用...
call npm run build:win
if %errorlevel% neq 0 (
    echo [错误] 应用构建失败
    pause
    exit /b 1
)

echo === 构建完成 ===
echo 安装包位于 dist 目录下
pause
