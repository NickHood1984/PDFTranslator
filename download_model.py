import os
import sys
import subprocess
from tqdm import tqdm
import requests
import json
from pathlib import Path

def download_from_url(url, output_path, filename, headers=None):
    """从 URL 下载文件"""
    try:
        response = requests.get(url, stream=True, headers=headers)
        if response.status_code == 200:
            total_size = int(response.headers.get('content-length', 0))
            block_size = 1024  # 1 KB
            progress_bar = tqdm(total=total_size, unit='iB', unit_scale=True, desc=f"下载 {filename}")
            
            with open(output_path, 'wb') as f:
                for data in response.iter_content(block_size):
                    progress_bar.update(len(data))
                    f.write(data)
            progress_bar.close()
            
            if total_size != 0 and progress_bar.n != total_size:
                print("下载的文件大小不正确")
                return False
            return True
    except Exception as e:
        print(f"下载出错: {e}")
        return False

def download_model():
    try:
        # 设置环境变量
        os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'
        
        # 获取当前脚本所在目录
        current_dir = os.path.dirname(os.path.abspath(__file__))
        print(f"当前目录: {current_dir}")
        
        # 创建模型目录
        model_dir = os.path.join(current_dir, 'models', 'DocLayout-YOLO-DocStructBench-onnx')
        os.makedirs(model_dir, exist_ok=True)
        print(f"创建模型目录: {model_dir}")
        
        # 模型文件路径
        model_path = os.path.join(model_dir, 'model.onnx')
        
        # 获取 GitHub token
        github_token = os.environ.get('GITHUB_TOKEN', '')
        headers = {'Authorization': f'token {github_token}'} if github_token else None
        
        # 尝试多个下载源
        download_urls = [
            "https://huggingface.co/wybxc/DocLayout-YOLO-DocStructBench-onnx/resolve/main/model.onnx",
            "https://raw.githubusercontent.com/wybxc/DocLayout-YOLO-DocStructBench-onnx/main/model.onnx",
            "https://github.com/wybxc/DocLayout-YOLO-DocStructBench-onnx/releases/download/v1.0/model.onnx"
        ]
        
        for url in download_urls:
            print(f"\n尝试从 {url} 下载...")
            if download_from_url(url, model_path, "model.onnx", headers=headers):
                print(f"模型文件下载到: {model_path}")
                print(f"文件大小: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
                return True
        
        print("\n所有下载源都失败，尝试使用 git lfs 下载...")
        try:
            # 使用 git lfs 下载
            repo_url = f"https://x-access-token:{github_token}@github.com/wybxc/DocLayout-YOLO-DocStructBench-onnx.git" if github_token else "https://github.com/wybxc/DocLayout-YOLO-DocStructBench-onnx.git"
            temp_dir = os.path.join(current_dir, "temp_repo")
            os.makedirs(temp_dir, exist_ok=True)
            
            # 克隆仓库
            subprocess.run(["git", "clone", "--depth", "1", repo_url, temp_dir], check=True)
            
            # 安装 git lfs
            subprocess.run(["git", "lfs", "install"], cwd=temp_dir, check=True)
            
            # 拉取 LFS 文件
            subprocess.run(["git", "lfs", "pull"], cwd=temp_dir, check=True)
            
            # 复制模型文件
            src_model = os.path.join(temp_dir, "model.onnx")
            if os.path.exists(src_model):
                import shutil
                shutil.copy2(src_model, model_path)
                print(f"模型文件下载到: {model_path}")
                print(f"文件大小: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
                
                # 清理临时目录
                shutil.rmtree(temp_dir)
                return True
            
        except Exception as e:
            print(f"git lfs 下载失败: {e}")
        
        print("\n所有下载方法都失败")
        return False
            
    except Exception as e:
        print(f"下载过程出错: {str(e)}")
        import traceback
        print(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    # 首先确保已安装必要的包
    required_packages = ['tqdm', 'requests']
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            print(f"正在安装 {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-U", package])
    
    print("开始下载模型...")
    success = download_model()
    if success:
        print("模型下载和安装完成！")
    else:
        print("模型下载失败，请检查网络连接或手动下载。")
        sys.exit(1) 