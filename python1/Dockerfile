# 使用 Python 作為基礎映像
FROM python:3.8

# 設置工作目錄為當前 Dockerfile 所在的目錄
WORKDIR /usr/src/app

# 安裝相關套件

RUN pip install transformers matplotlib wordcloud beautifulsoup4

# 複製自然語言處理代碼
COPY . .

# 執行自然語言處理腳本
CMD ["python", "model.py"]

