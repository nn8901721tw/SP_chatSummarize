from wordcloud import WordCloud, STOPWORDS
from collections import Counter  # 次數統計
import jieba.analyse
import jieba
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
import sys
import json
import os

# # 讀取JSON數據
# data = json.loads(sys.stdin.read())

# dictfile = r"D:\user\Desktop\MERN\mernchat\python1\wordcloud\dict.txt.big.txt"  # 字典檔
# stopfile = r"D:\user\Desktop\MERN\mernchat\python1\wordcloud\jieba-master\jieba-master\extra_dict\stop_words.txt"  # stopwords

# mdfile = r"D:\user\Desktop\MERN\mernchat\python1\wordcloud\test.txt"  # 文檔
# jpgfile = r"D:\user\Desktop\MERN\mernchat\python1\wordcloud\cat.jpg"  # 底圖
# mask = np.array(Image.open(jpgfile))

# jieba.set_dictionary(dictfile)
# jieba.analyse.set_stop_words(stopfile)

# text = open(mdfile, "r", encoding="utf-8").read()
# tags = jieba.analyse.extract_tags(text, topK=50)

# seg_list = jieba.lcut(text, cut_all=False)
# dictionary = Counter(seg_list)

# freq = {}
# for ele in dictionary:
#     if ele in tags:
#         freq[ele] = dictionary[ele]
# print(freq)  # 計算出現的次數
# wordcloud = WordCloud(background_color="white", mask=mask, contour_width=3,
#                       contour_color='steelblue', font_path='kaiu.ttf').generate_from_frequencies(freq)

# plt.figure()
# plt.imshow(wordcloud, interpolation="bilinear")
# plt.axis("off")

# # 儲存圖片
# plt.savefig('D:\user\Desktop\MERN\mernchat\python1\img\wordcloud87.png',
#             dpi=300, bbox_inches='tight')

# # 回傳圖片檔名給 JS
# print(json.dumps({'filename': 'wordcloud87.png'}))
# plt.show()


import sys
import json

# 讀取nodejs傳遞過來的JSON字符串
data = json.loads(sys.argv[1])

# 在這裡進行你的文字雲生成程序，產生圖像檔案

# 將圖像檔案保存到指定路徑
# imagePath = "D:\user\Desktop\MERN\mernchat\python1\img\wordcloud87.png"
# wordCloudImage.save(imagePath)

# 返回圖像檔案路徑到nodejs
print(data)
