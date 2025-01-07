import os
import sys
import shutil
from pathlib import Path

def setup_model():
    try:
        # 设置环境变量
        os.environ['PYTHONIOENCODING'] = 'utf-8'
        
        # 获取当前脚本所在目录
        current_dir = os.path.dirname(os.path.abspath(__file__))
        print(f"Current directory: {current_dir}")
        
        # 创建模型目录
        model_dir = os.path.join(current_dir, 'models', 'DocLayout-YOLO-DocStructBench-onnx')
        os.makedirs(model_dir, exist_ok=True)
        print(f"Created model directory: {model_dir}")
        
        # 模型文件路径
        model_path = os.path.join(model_dir, 'model.onnx')
        
        # 检查本地模型文件
        local_model = os.path.join(current_dir, 'local_models', 'model.onnx')
        if os.path.exists(local_model):
            print(f"Found local model at: {local_model}")
            print("Copying local model to models directory...")
            shutil.copy2(local_model, model_path)
            print(f"Model file copied to: {model_path}")
            print(f"File size: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
            return True
        else:
            print("Local model not found.")
            return False
            
    except Exception as e:
        print(f"Setup process error: {str(e)}")
        import traceback
        print(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    print("Starting model setup...")
    success = setup_model()
    if success:
        print("Model setup completed!")
    else:
        print("Model setup failed. Please check if local model exists.")
        sys.exit(1) 