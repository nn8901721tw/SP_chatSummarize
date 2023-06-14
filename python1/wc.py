import numpy as np
import matplotlib.pyplot as plt
import sys
import json
import os
import uuid

from wordcloud import WordCloud
from wordcloud import STOPWORDS, ImageColorGenerator

text = open("D:\\user\\Desktop\\MERN\\SP_mernchat\\python1\\img\\data2.txt",
            encoding='utf-8').read()

stopword = set(STOPWORDS)
Wordcloud = WordCloud(width=3000, height=400, stopwords=STOPWORDS, margin=3,
                      background_color="white", colormap="Set3", max_words=25, min_font_size=8).generate(text)

# 生成唯一的文件名
unique_filename = str(uuid.uuid4())
imagePath = os.path.join(
    'D:\\user\\Desktop\\MERN\\SP_mernchat\\python1\\img', f'wordcloud_{unique_filename}.png')
Wordcloud.to_file(imagePath)

print(imagePath)
