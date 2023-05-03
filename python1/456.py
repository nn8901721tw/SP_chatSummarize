import pandas as pd
import numpy as np
import requests 
from bs4 import BeautifulSoup 
import jieba
from collections import Counter 
from PIL import Image 
import matplotlib.pyplot as plt
import wordcloud 

# 抓取中央社新聞的一篇文章當範例
url = 'https://tw.news.yahoo.com/%E6%99%B6%E5%9C%93%E5%BB%A0%E6%89%8D%E6%98%AF%E7%9C%9F%E6%AD%A3%E7%9A%84%E9%87%91%E9%9B%9E%E6%AF%8D-%E6%A5%8A%E6%87%89%E8%B6%85%E7%82%BA%E8%8B%B1%E7%89%B9%E7%88%BE%E7%B7%A9%E9%A0%B0-%E4%BB%A3%E5%B7%A5%E7%9A%84%E5%8F%B0%E7%A9%8D%E9%9B%BB%E6%80%8E%E9%BA%BC%E8%BE%A6-114410893.html'
r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')
texts = soup.find_all('p', class_='M(0)')
text = texts[0].text


# 設定分詞資料庫
jieba.set_dictionary("D:\wordcloud\dict.txt.big.txt")

# 新增及刪除常用詞
jieba.add_word('台灣') # 加入台灣
jieba.add_word('疫情') # 加入疫情
jieba.del_word('大') # 刪除大

# 斷句方式
seg_list = jieba.cut(text, cut_all=False) 

# 統計分詞出現次數
dictionary = Counter(seg_list)

# 移除停用詞
stopwords = [' ', '，', '（', '）', '...', '。', '「', '」'] 
[dictionary.pop(x, None) for x in stopwords] 

dictionary

# 產生文字雲
font_path = "C:/Windows/Fonts/Arial.ttf" # 設定字體格式
wc = wordcloud.WordCloud(background_color='white',  
                         margin=2, 
                         font_path=font_path, 
                         max_words=200, 
                         width=1080, 
                         height=720, 
                         relative_scaling=0.5 ).generate_from_frequencies(dictionary)# 生成文字雲

# 輸出
wc.to_file('news_wordcloud.png')

# 顯示文字雲
plt.imshow(wc, interpolation='bilinear')
plt.axis("off")
plt.show()