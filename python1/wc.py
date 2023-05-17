import numpy as np
import matplotlib.pyplot as plt
import sys
import json
import os

from wordcloud import WordCloud
from wordcloud import STOPWORDS, ImageColorGenerator

text = open("D:\\user\\Desktop\\MERN\\SP_mernchat\\python1\\img\\data2.txt",
            encoding='utf-8').read()

stopword = set(STOPWORDS)
Wordcloud = WordCloud(width=3000, height=400, stopwords=STOPWORDS, margin=3,
                      background_color="white", colormap="Set3", max_words=25, min_font_size=8).generate(text)

# 將文字雲圖片儲存到指定路徑
imagePath = os.path.join(
    'D:\\user\\Desktop\\MERN\\SP_mernchat\\python1\\img', 'wordcloud3.png')
Wordcloud.to_file(imagePath)

print(imagePath)
