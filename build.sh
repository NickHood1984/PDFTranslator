#!/bin/bash

# 清理旧的构建文件
echo "清理旧的构建文件..."
rm -rf dist
rm -rf python_env

# 设置环境
echo "设置Python环境..."
chmod +x setup_dev.sh
./setup_dev.sh

# 构建CSS
echo "构建CSS..."
npm run build:css

# 打包Mac版本
echo "开始打包Mac版本..."
npm run build:mac

# 打包Windows版本
echo "开始打包Windows版本..."
npm run build:win

echo "打包完成！"
echo "Mac版本和Windows版本已生成在dist目录下"
echo "Mac版本："
ls -l dist/*.dmg
echo "Windows版本："
ls -l dist/*.exe 