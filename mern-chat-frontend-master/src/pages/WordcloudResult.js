import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function WordcloudResult() {
    const location = useLocation();
    const { state } = location;
    const imagePath = state && state.imagePath;
    let imageSrc = '';

    if (imagePath) {
        // 將圖片路徑作為 base64 字符串設定給圖片的 src 屬性
        imageSrc = `data:image/png;base64,${imagePath}`;
    } else {
        // 處理 imagePath 未定義的情況，例如導向其他頁面或顯示錯誤訊息
        return <div>找不到圖片路徑</div>;
    }

    return (
        <div>
            <img src={imageSrc} alt="文字雲" />
            <Link to="/">返回</Link>
        </div>
    );
}

export default WordcloudResult;