import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Process() {
    const [processData, setProcessData] = useState([]);
    const user = useSelector((state) => state.user);
    const userID = user && user._id;      //通過使用邏輯與（&&）操作符，如果 user 存在，則繼續訪問 user._id；如果 user 為 null 或 undefined，則不會繼續執行後續代碼，從而避免出現錯誤。
    console.log(userID);
    useEffect(() => {
        if (user && user._id) {
            fetchProcessData();
        }
    }, [user]);

    async function fetchProcessData() {
        try {
            const response = await axios.get('http://localhost:5001/admin/process', {
                params: {
                    fromId: userID,
                },
            });
            const data = response.data;
            setProcessData(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex justify-content-center" style={{ margin: '40px' }}>

            <div className="w-100" style={{ background: '#f7f3e9', padding: '20px' }}>

                <h1 className="text-center text-dark font-weight-bold" style={{ fontWeight: 'bold' }}> History</h1>
                <Table striped bordered hover variant="light" style={{ backgroundColor: '#eadfc6' }}>
                    <thead>
                        <tr>
                            <th style={{ fontSize: 'larger', color: '#4c4c4c' }}>Result</th>
                            <th style={{ fontSize: 'larger', color: '#4c4c4c' }}>Room</th>
                            <th style={{ fontSize: 'larger', color: '#4c4c4c' }}>CreatedAt</th>
                            <th style={{ fontSize: 'larger', color: '#4c4c4c' }}>Wordcloud</th>
                        </tr>
                    </thead>

                    <tbody>

                        {processData.map((process) => (
                            <tr key={process._id}>

                                <td style={{ fontSize: 'larger', color: '#4c4c4c' }}>{process.result}</td>
                                <td style={{ fontSize: 'larger', color: '#4c4c4c' }}>{process.to}</td>
                                <td style={{ fontSize: 'larger', color: '#4c4c4c' }}>{process.createdAt}</td>
                                <td style={{ fontSize: 'larger', color: '#4c4c4c' }}>無</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {!user && <div className="alert alert-danger">Please login</div>}
            </div>

        </div>

    );
}

export default Process;
