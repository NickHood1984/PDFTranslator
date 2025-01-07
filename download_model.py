import os
import sys
import subprocess
from tqdm import tqdm
from huggingface_hub import hf_hub_download
import requests

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
        
        print("正在获取模型信息...")
        
        try:
            # 直接使用 huggingface_hub 下载
            print("正在下载模型文件...")
            model_path = hf_hub_download(
                repo_id="wybxc/DocLayout-YOLO-DocStructBench-onnx",
                filename="model.onnx",
                local_dir=model_dir,
                local_dir_use_symlinks=False,
                resume_download=True,
                force_download=False,
                proxies=None,
                etag_timeout=10,
                force_filename="model.onnx"
            )
            
            print(f"模型文件下载到: {model_path}")
            print(f"文件大小: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
            
            if os.path.exists(model_path) and os.path.getsize(model_path) > 0:
                print("模型下载完成！")
                return True
            else:
                print("模型文件下载不完整")
                return False
                
        except Exception as e:
            print(f"使用 huggingface_hub 下载失败: {str(e)}")
            print("尝试使用备用方法下载...")
            
            # 备用下载方法：使用 huggingface-cli
            command = f"huggingface-cli download --resume-download wybxc/DocLayout-YOLO-DocStructBench-onnx --local-dir {model_dir}"
            
            process = subprocess.Popen(
                command,
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                env={**os.environ, 'HF_ENDPOINT': 'https://hf-mirror.com'}
            )
            
            # 实时输出下载进度
            while True:
                output = process.stdout.readline()
                if output == b'' and process.poll() is not None:
                    break
                if output:
                    print(output.decode().strip())
            
            if process.returncode == 0:
                # 检查下载的文件并重命名
                for file in os.listdir(model_dir):
                    if file.endswith('.onnx'):
                        old_path = os.path.join(model_dir, file)
                        new_path = os.path.join(model_dir, 'model.onnx')
                        if old_path != new_path:
                            if os.path.exists(new_path):
                                os.remove(new_path)
                            os.rename(old_path, new_path)
                        print(f"模型文件大小: {os.path.getsize(new_path) / 1024 / 1024:.2f} MB")
                        break
                
                print("模型下载完成！")
                return True
            else:
                error = process.stderr.read().decode()
                print(f"下载失败: {error}")
                return False
            
    except Exception as e:
        print(f"下载过程出错: {str(e)}")
        import traceback
        print(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    # 首先确保已安装必要的包
    required_packages = ['huggingface_hub', 'tqdm', 'requests']
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            print(f"正在安装 {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-U", package])
    
    # 设置更长的超时时间
    os.environ['HF_HUB_DOWNLOAD_TIMEOUT'] = '600'
    os.environ['HF_HUB_ENABLE_HF_TRANSFER'] = '1'
    
    print("开始下载模型...")
    success = download_model()
    if success:
        print("模型下载和安装完成！")
    else:
        print("模型下载失败，请检查网络连接或手动下载。")
        sys.exit(1) 