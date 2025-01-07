import os
import sys
import shutil
import subprocess
from pathlib import Path

def find_model_file(directory):
    """在目录中查找模型文件"""
    print(f"\n在 {directory} 中查找模型文件...")
    # 列出目录内容
    try:
        for root, dirs, files in os.walk(directory):
            print(f"检查目录: {root}")
            print(f"找到文件: {files}")
            for file in files:
                if file.endswith('.onnx'):
                    model_path = os.path.join(root, file)
                    if os.path.getsize(model_path) > 0:
                        print(f"找到模型文件: {model_path}")
                        return model_path
    except Exception as e:
        print(f"查找文件时出错: {e}")
    return None

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
        
        # 创建临时目录用于克隆
        temp_dir = os.path.join(current_dir, 'temp_clone')
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
        os.makedirs(temp_dir)
        
        # 模型文件路径
        model_path = os.path.join(model_dir, 'model.onnx')
        
        try:
            print("\n克隆模型仓库...")
            subprocess.run(
                ['git', 'clone', 'https://huggingface.co/wybxc/DocLayout-YOLO-DocStructBench-onnx', temp_dir],
                check=True,
                capture_output=True,
                text=True
            )
            
            # 查找模型文件
            found_model = find_model_file(temp_dir)
            if found_model:
                print(f"找到模型文件，大小: {os.path.getsize(found_model) / 1024 / 1024:.2f} MB")
                print("复制模型到模型目录...")
                shutil.copy2(found_model, model_path)
                print(f"模型文件已复制到: {model_path}")
                print(f"文件大小: {os.path.getsize(model_path) / 1024 / 1024:.2f} MB")
                
                # 清理临时目录
                shutil.rmtree(temp_dir)
                return True
            else:
                print("克隆的仓库中未找到有效的模型文件")
                return False
                
        except subprocess.CalledProcessError as e:
            print(f"克隆失败: {e.stderr}")
            return False
        except Exception as e:
            print(f"处理克隆的文件时出错: {e}")
            return False
        finally:
            # 确保清理临时目录
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)
            
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
        print("模型设置失败，请检查网络连接或手动下载模型。")
        sys.exit(1) 