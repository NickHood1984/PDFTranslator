import os
import sys
import shutil
import requests
from pathlib import Path
from tqdm import tqdm

def download_from_url(url, output_path, filename, headers=None):
    """从 URL 下载文件"""
    try:
        if headers is None:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        
        response = requests.get(url, stream=True, headers=headers, timeout=30)
        response.raise_for_status()
        
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

def setup_model():
    try:
        # 设置环境变量
        os.environ['PYTHONIOENCODING'] = 'utf-8'
        os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'
        
        # 获取当前脚本所在目录
        current_dir = os.path.dirname(os.path.abspath(__file__))
        print(f"当前目录: {current_dir}")
        
        # 创建模型目录
        model_dir = os.path.join(current_dir, 'models', 'DocLayout-YOLO-DocStructBench-onnx')
        os.makedirs(model_dir, exist_ok=True)
        print(f"创建模型目录: {model_dir}")
        
        # 创建本地模型目录
        local_model_dir = os.path.join(current_dir, 'local_models')
        os.makedirs(local_model_dir, exist_ok=True)
        
        # 模型文件路径
        model_path = os.path.join(model_dir, 'model.onnx')
        local_model = os.path.join(local_model_dir, 'model.onnx')
        
        # 尝试下载模型
        if not os.path.exists(local_model):
            print("本地模型不存在，尝试下载...")
            
            # 尝试多个下载源
            download_urls = [
                "https://hf-mirror.com/wybxc/DocLayout-YOLO-DocStructBench-onnx/resolve/main/model.onnx",
                "https://huggingface.co/wybxc/DocLayout-YOLO-DocStructBench-onnx/resolve/main/model.onnx",
                "https://modelscope.cn/api/v1/models/wybxc/DocLayout-YOLO-DocStructBench-onnx/repo/files?Revision=master&FilePath=model.onnx",
                "https://modelscope.cn/models/wybxc/DocLayout-YOLO-DocStructBench-onnx/files/model.onnx",
                "https://modelscope.cn/models/wybxc/DocLayout-YOLO-DocStructBench-onnx/repo/files/model.onnx",
                "https://ghproxy.com/https://github.com/wybxc/DocLayout-YOLO-DocStructBench-onnx/releases/download/v1.0/model.onnx",
                "https://download.fastgit.org/wybxc/DocLayout-YOLO-DocStructBench-onnx/releases/download/v1.0/model.onnx",
                "https://hub.fastgit.xyz/wybxc/DocLayout-YOLO-DocStructBench-onnx/releases/download/v1.0/model.onnx"
            ]
            
            for url in download_urls:
                print(f"\n尝试从 {url} 下载...")
                if download_from_url(url, local_model, "model.onnx"):
                    print(f"模型文件下载到: {local_model}")
                    print(f"文件大小: {os.path.getsize(local_model) / 1024 / 1024:.2f} MB")
                    break
        
        # 检查本地模型文件
        if os.path.exists(local_model) and os.path.getsize(local_model) > 0:
            print(f"找到本地模型: {local_model}")
            print("复制模型到模型目录...")
            shutil.copy2(local_model, model_path)
            print(f"模型文件已复制到: {model_path}")
            print(f"文件大小: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
            return True
        else:
            if os.path.exists(local_model):
                os.remove(local_model)  # 删除空文件
            print("本地模型未找到，且下载失败。")
            return False
            
    except Exception as e:
        print(f"设置过程出错: {str(e)}")
        import traceback
        print(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    print("开始设置模型...")
    success = setup_model()
    if success:
        print("模型设置完成！")
    else:
        print("模型设置失败，请检查本地模型是否存在。")
        sys.exit(1) 