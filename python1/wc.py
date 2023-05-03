import numpy as np
import matplotlib.pyplot as plt

from wordcloud import WordCloud
from wordcloud import STOPWORDS, ImageColorGenerator

ch_news = open("D:\下載\sample1.txt").read()

stopword=set(STOPWORDS)
Wordcloud=WordCloud(width=3000,height=400,stopwords=STOPWORDS,margin=3,background_color="white",colormap="Set3",max_words=25,min_font_size=8).generate(ch_news)
plt.imshow(Wordcloud, interpolation='bilinear')
plt.axis("off")
plt.show(  )