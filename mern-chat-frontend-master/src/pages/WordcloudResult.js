import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';

function WordcloudResult() {
    const location = useLocation();
    const { state } = location;
    const { base64Image, imagePath } = state || '';
    let base64imageSrc = '';

    if (imagePath) {
        base64imageSrc = `data:image/png;base64,${base64Image}`;
    } else {
        return <div>找不到圖片路徑</div>;
    }

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
            <h1 className="text-center mb-4 font-weight-bold" style={{ marginTop: '-200px' }}>Word Cloud Result from</h1>
            <Image src={base64imageSrc} alt="文字雲" style={{ width: '100%', marginTop: '50px' }} />
            <Link to="/chat">
                <Button variant="primary" className="mt-3">返回</Button>
            </Link>
        </Container>
    );
}

export default WordcloudResult;
