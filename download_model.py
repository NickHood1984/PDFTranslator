import os
import sys
import shutil
from pathlib import Path
from huggingface_hub import hf_hub_download

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
            print("本地模型不存在，尝试从 Hugging Face 下载...")
            try:
                downloaded_path = hf_hub_download(
                    repo_id="wybxc/DocLayout-YOLO-DocStructBench-onnx",
                    filename="model.onnx",
                    local_dir=local_model_dir,
                    local_dir_use_symlinks=False
                )
                print(f"模型文件下载到: {downloaded_path}")
                if os.path.exists(downloaded_path) and os.path.getsize(downloaded_path) > 0:
                    print(f"文件大小: {os.path.getsize(downloaded_path) / 1024 / 1024:.2f} MB")
                    # 如果文件名不是 model.onnx，重命名
                    if os.path.basename(downloaded_path) != 'model.onnx':
                        os.rename(downloaded_path, local_model)
                else:
                    print("下载的文件无效")
                    return False
            except Exception as e:
                print(f"从 Hugging Face 下载失败: {e}")
                return False
        
        # 检查本地模型文件
        if os.path.exists(local_model):
            print(f"找到本地模型: {local_model}")
            print("复制模型到模型目录...")
            shutil.copy2(local_model, model_path)
            print(f"模型文件已复制到: {model_path}")
            print(f"文件大小: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
            return True
        else:
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