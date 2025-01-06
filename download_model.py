import os
import sys
import subprocess
from tqdm import tqdm

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
        
        print("正在使用 huggingface-cli 下载模型...")
        
        # 使用 huggingface-cli 下载
        command = f"huggingface-cli download --resume-download wybxc/DocLayout-YOLO-DocStructBench-onnx --local-dir {model_dir}"
        
        # 执行下载命令
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
                
        # 检查是否下载成功
        if process.returncode == 0:
            # 检查下载的文件并重命名
            for file in os.listdir(model_dir):
                if file.endswith('.onnx'):
                    old_path = os.path.join(model_dir, file)
                    new_path = os.path.join(model_dir, 'model.onnx')
                    if old_path != new_path:
                        # 如果目标文件已存在，先删除它
                        if os.path.exists(new_path):
                            os.remove(new_path)
                        os.rename(old_path, new_path)
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
    # 首先确保已安装 huggingface_hub
    try:
        import huggingface_hub
    except ImportError:
        print("正在安装 huggingface_hub...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-U", "huggingface_hub"])
    
    download_model() 