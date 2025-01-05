import os
import sys
from pdf2zh import translate_stream
import json
import traceback
from PyPDF2 import PdfReader
import re

def get_pdf_title(pdf_path):
    try:
        # 尝试从PDF元数据中获取标题
        reader = PdfReader(pdf_path)
        metadata = reader.metadata
        
        if metadata and "/Title" in metadata:
            title = metadata.get("/Title", "")
            # 如果标题是PDF格式的字符串，需要解码
            if isinstance(title, bytes):
                try:
                    title = title.decode('utf-8')
                except UnicodeDecodeError:
                    try:
                        title = title.decode('latin-1')
                    except UnicodeDecodeError:
                        title = title.decode('utf-8', errors='ignore')
            
            # 清理标题中的非法字符
            title = re.sub(r'[<>:"/\\|?*]', '_', str(title))
            title = title.strip()
            
            if title:
                return title
    except Exception as e:
        print(f"读取PDF元数据失败: {str(e)}", file=sys.stderr)
    
    # 如果无法获取标题或标题为空，返回文件名（不含扩展名）
    return os.path.splitext(os.path.basename(pdf_path))[0]

def convert_pdf(input_path, output_path, config_path):
    try:
        print("开始执行转换...", file=sys.stderr)
        print(f"输入文件: {input_path}", file=sys.stderr)
        print(f"输出文件: {output_path}", file=sys.stderr)
        print(f"配置文件: {config_path}", file=sys.stderr)

        # 检查文件是否存在
        if not os.path.exists(input_path):
            raise FileNotFoundError(f"输入文件不存在: {input_path}")
        
        if not os.path.exists(config_path):
            raise FileNotFoundError(f"配置文件不存在: {config_path}")

        # 获取PDF标题
        pdf_title = get_pdf_title(input_path)
        print(f"PDF标题: {pdf_title}", file=sys.stderr)
        
        # 使用PDF标题作为输出文件名
        output_dir = os.path.dirname(output_path)
        output_base = os.path.join(output_dir, pdf_title)

        # 读取配置文件
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                config = json.load(f)
                print(f"成功读取配置: {json.dumps(config, ensure_ascii=False)}", file=sys.stderr)
        except Exception as e:
            print(f"读取配置文件失败: {str(e)}", file=sys.stderr)
            raise
        
        # 设置环境变量
        service = config['service']
        print(f"使用翻译服务: {service}", file=sys.stderr)
        
        # 构建完整的服务字符串
        if service == 'deepseek':
            os.environ["OPENAI_API_KEY"] = config['deepseek']['api_key']
            os.environ["OPENAI_MODEL"] = config['deepseek']['model']
            os.environ["OPENAI_BASE_URL"] = "https://api.deepseek.com/v1"
            service = f"openai:{config['deepseek']['model']}"
        elif service == 'google':
            service = "google"
        elif service == 'deepl':
            os.environ["DEEPL_AUTH_KEY"] = config['deepl']['auth_key']
            service = "deepl"
        elif service == 'azure':
            os.environ["AZURE_ENDPOINT"] = config['azure']['endpoint']
            os.environ["AZURE_API_KEY"] = config['azure']['api_key']
            service = "azure"
        
        # 设置代理
        if config.get('proxy'):
            os.environ["http_proxy"] = config['proxy']
            os.environ["https_proxy"] = config['proxy']
            print(f"设置代理: {config['proxy']}", file=sys.stderr)

        # 准备翻译参数
        params = {
            "lang_in": config['lang_in'],
            "lang_out": config['lang_out'],
            "service": service,
            "thread": config['thread']
        }
        print(f"翻译参数: {json.dumps(params, ensure_ascii=False)}", file=sys.stderr)

        print("Stage: 正在读取 PDF", flush=True)
        try:
            with open(input_path, 'rb') as f:
                pdf_content = f.read()
                print(f"PDF文件大小: {len(pdf_content)} 字节", file=sys.stderr)
        except Exception as e:
            print(f"读取PDF文件失败: {str(e)}", file=sys.stderr)
            raise

        print("Stage: 正在翻译", flush=True)
        print(f"使用服务: {service}", flush=True)

        # 使用 translate_stream 函数
        try:
            stream_mono, stream_dual = translate_stream(stream=pdf_content, **params)
            print(f"翻译完成，生成文件大小 - 单语: {len(stream_mono)} 字节, 双语: {len(stream_dual)} 字节", file=sys.stderr)
        except Exception as e:
            print(f"翻译过程失败: {str(e)}", file=sys.stderr)
            print(f"错误堆栈: {traceback.format_exc()}", file=sys.stderr)
            raise

        # 保存结果
        try:
            mono_path = f"{output_base}_译文.pdf"
            dual_path = f"{output_base}_双语.pdf"

            with open(mono_path, 'wb') as f:
                f.write(stream_mono)
            with open(dual_path, 'wb') as f:
                f.write(stream_dual)
            print("转换成功！", flush=True)
        except Exception as e:
            print(f"保存结果失败: {str(e)}", file=sys.stderr)
            raise

        return True

    except Exception as e:
        print(f"错误堆栈: {traceback.format_exc()}", file=sys.stderr)
        raise e

if __name__ == "__main__":
    if len(sys.argv) > 3:
        input_pdf_path = sys.argv[1]
        output_pdf_path = sys.argv[2]
        config_path = sys.argv[3]
        
        try:
            convert_pdf(input_pdf_path, output_pdf_path, config_path)
        except Exception as e:
            print(f"转换失败: {str(e)}", file=sys.stderr)
            sys.exit(1)
    else:
        print("Usage: python main.py <input_pdf> <output_pdf> <config_json>", file=sys.stderr)
        sys.exit(1)