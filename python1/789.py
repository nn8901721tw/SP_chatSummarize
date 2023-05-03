import os.path                  # 系統功能模組
import numpy                    # 分析模組
import requests                 # 網路模組
from collections import Counter # 次數統計模組

from bs4 import BeautifulSoup   # 網頁解析模組
from PIL import Image           # 圖片處理模組
import jieba                    # 分詞模組
import matplotlib.pyplot as plt # 視覺化模組
import wordcloud                # 文字雲模組


# 要抓取的Yahoo新聞網址
URL = 'https://tw.news.yahoo.com/%E6%98%8E%E5%9B%9E%E6%9A%96%E4%B8%8A%E7%9C%8B28%E5%BA%A6-%E9%80%99%E5%A4%A9-%E6%9D%B1%E5%8C%97%E9%A2%A8%E5%9B%9E%E6%AD%B8%E5%86%8D%E9%99%8D%E6%BA%AB-%E5%8C%97%E9%83%A8%E9%80%A3%E7%BA%8C%E7%82%B8%E9%9B%A84%E5%A4%A9-104228478.html'

# 定義檔名
WORDS_PATH = "D:/wordcloud/dict.txt.big.txt" # 繁體中文詞庫檔名
TC_FONT_PATH = "C:/Windows/Fonts/Arial.ttf" # 繁體中文字型檔名

# 下載網頁
re = requests.get(URL)

# 網頁解析
soup = BeautifulSoup(re.text, 'html.parser')
texts = soup.find_all('p', class_='')

all_text = ''
for t in texts:
  if len(t.findChildren()) != 0: # 有子標籤的內容去掉不要
    continue
  all_text += t.text

print(all_text)

# 切換繁體中文詞庫
jieba.set_dictionary(WORDS_PATH)

# 進行斷詞
seg_list = jieba.lcut(all_text)
print(seg_list) # 把斷完的詞顯示出來看看

# 統計分詞出現次數
dictionary = Counter(seg_list)

# 移除停用詞
STOP_WORDS = [' ', '，', '（', '）', '...', '。', '「', '」', '[', ']']
[dictionary.pop(x, None) for x in STOP_WORDS] # 從字典裡刪除停用詞
print(dictionary) # 把計算完的每個分詞出現次數顯示出來看看

# 文字雲格式設定
wc = wordcloud.WordCloud(background_color='white',
                         margin=2, # 文字間距
                         font_path=TC_FONT_PATH, # 設定字體
                         max_words=200, # 取多少文字在裡面
                         width=1280, height=720).generate_from_frequencies(dictionary) # 解析度
                         
# 生成文字雲 # 吃入次數字典資料

# 產生圖檔
wc.to_file('WordCloud.png')

# 顯示文字雲圖片
plt.figure()
plt.imshow(wc, interpolation="bilinear")
plt.axis("off")
plt.show()