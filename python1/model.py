from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import sys
import json
import os


# # 讀取nodejs傳遞過來的JSON字符串
data = json.loads(sys.argv[1])
text = data['text']

# input_data = sys.stdin.readline()
# data = json.loads(input_data)
# text = data['text']
# 在這裡進行你的文字雲生成程序，產生圖像檔案

# 將圖像檔案保存到指定路徑
# imagePath = "D:\user\Desktop\MERN\mernchat\python1\img\wordcloud87.png"
# wordCloudImage.save(imagePath)

# 返回圖像檔案路徑到nodejs

# 載入模型和tokenizer
model_name = "philschmid/bart-large-cnn-samsum"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# 輸入原文
# source_text = '''Jeff: Can I train a 🤗 Transformers model on Amazon SageMaker?
#                 Philipp: Sure you can use the new Hugging Face Deep Learning Container.
#                 Jeff: ok.
#                 Jeff: and how can I get started?
#                 Jeff: where can I find documentation?
#                 Philipp: ok, ok you can find everything here.'''

# 將原文編碼為tokenizer所需格式
input_ids = tokenizer.encode(text, return_tensors="pt")

# 生成摘要
summary_ids = model.generate(
    input_ids, num_beams=4, max_length=100, early_stopping=True)
summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# 顯示摘要
print(summary)

# print(json.dumps({'summary': summary}))

# import sys
# import json


# data = json.loads(sys.argv[1])

# 在這裡進行你的文字雲生成程序，產生圖像檔案

# 將圖像檔案保存到指定路徑
# imagePath = "D:\user\Desktop\MERN\mernchat\python1\img\wordcloud87.png"
# wordCloudImage.save(imagePath)

# 返回圖像檔案路徑到nodejs
# print(data)
