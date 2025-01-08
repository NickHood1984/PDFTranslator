import os
import requests
from pathlib import Path

def download_file(url, local_path):
    print(f"Downloading from {url} to {local_path}")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    total_size = int(response.headers.get('content-length', 0))
    block_size = 8192
    downloaded = 0

    with open(local_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=block_size):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                if total_size:
                    percent = int(downloaded * 100 / total_size)
                    print(f"\rDownload progress: {percent}%", end='')
    print("\nDownload completed!")

def setup_model():
    try:
        # 创建模型目录
        models_dir = Path("models")
        local_models_dir = Path("local_models")
        models_dir.mkdir(exist_ok=True)
        local_models_dir.mkdir(exist_ok=True)

        # 下载布局分析模型
        layout_model_url = "https://huggingface.co/wybxc/DocLayout-YOLO-DocStructBench-onnx/resolve/main/model.onnx"
        layout_model_path = models_dir / "model.onnx"
        if not layout_model_path.exists():
            print("Downloading layout analysis model...")
            download_file(layout_model_url, layout_model_path)

        # 下载文本嵌入模型文件
        embedding_model_files = [
            "config.json",
            "pytorch_model.bin",
            "special_tokens_map.json",
            "tokenizer_config.json",
            "tokenizer.json",
            "vocab.txt"
        ]
        
        base_url = "https://huggingface.co/BAAI/bge-small-zh/resolve/main"
        for file in embedding_model_files:
            target_path = models_dir / file
            if not target_path.exists():
                print(f"Downloading {file}...")
                url = f"{base_url}/{file}"
                download_file(url, target_path)

        print("All models downloaded successfully!")
        return True

    except Exception as e:
        print(f"Error during setup: {str(e)}")
        return False

if __name__ == "__main__":
    print("开始设置模型...")
    success = setup_model()
    if success:
        print("模型设置完成！")
    else:
        print("模型设置失败，请检查网络连接或手动下载模型。")
        os._exit(1)