import os
import sys
import subprocess
from tqdm import tqdm
import requests
import json
from pathlib import Path

# 设置环境变量
os.environ['PYTHONIOENCODING'] = 'utf-8'

# 设置标准输出编码
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer)

def download_from_url(url, output_path, filename, headers=None):
    """从 URL 下载文件"""
    try:
        response = requests.get(url, stream=True, headers=headers)
        if response.status_code == 200:
            total_size = int(response.headers.get('content-length', 0))
            block_size = 1024  # 1 KB
            progress_bar = tqdm(total=total_size, unit='iB', unit_scale=True, desc=f"Downloading {filename}")
            
            with open(output_path, 'wb') as f:
                for data in response.iter_content(block_size):
                    progress_bar.update(len(data))
                    f.write(data)
            progress_bar.close()
            
            if total_size != 0 and progress_bar.n != total_size:
                print("ERROR: Downloaded file size does not match expected size")
                return False
            return True
    except Exception as e:
        print(f"Download error: {e}")
        return False

def download_model():
    try:
        # 设置环境变量
        os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'
        
        # 获取当前脚本所在目录
        current_dir = os.path.dirname(os.path.abspath(__file__))
        print(f"Current directory: {current_dir}")
        
        # 创建模型目录
        model_dir = os.path.join(current_dir, 'models', 'DocLayout-YOLO-DocStructBench-onnx')
        os.makedirs(model_dir, exist_ok=True)
        print(f"Created model directory: {model_dir}")
        
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
            print(f"\nTrying to download from {url}...")
            if download_from_url(url, model_path, "model.onnx", headers=headers):
                print(f"Model file downloaded to: {model_path}")
                print(f"File size: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
                return True
        
        print("\nAll download sources failed")
        return False
            
    except Exception as e:
        print(f"Download process error: {str(e)}")
        import traceback
        print(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    print("Starting model download...")
    success = download_model()
    if success:
        print("Model download and installation completed!")
    else:
        print("Model download failed. Please check your network connection or download manually.")
        sys.exit(1) 