const express = require("express");


const app = express();
    app.use(express.json());

const pynode = require('pynode');

// 定義一段文字作為輸入
const text = 'This is a sample text for generating wordcloud';

// 將 Python 代碼作為字串傳遞給 PyNode
const pythonCode = `
from wordcloud import WordCloud
import matplotlib.pyplot as plt

def generate_wordcloud(text):
    wordcloud = WordCloud(width=800, height=800,
                          background_color='white',
                          min_font_size=10).generate(text)

    plt.figure(figsize=(8, 8), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)

    from io import BytesIO
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_data = buffer.getvalue()
    import base64
    image_base64 = base64.b64encode(image_data).decode('utf-8')

    return image_base64`

    result = pynode.run(pythonCode, [text]);
    console.log(result[0]);
    
    app.listen(5000, () => console.log("Server started on port " + port));