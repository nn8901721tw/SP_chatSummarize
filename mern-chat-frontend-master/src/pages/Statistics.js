import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Statistics() {
    const [statisticsData, setStatisticsData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const user = useSelector((state) => state.user);
    const userID = user && user._id;
    console.log(userID);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        if (user && user._id) {
            fetchStatisticsData();
            fetchTopics();
        }
    }, [user, filterValue]);

    async function fetchStatisticsData() {
        try {
            const response = await axios.get('http://localhost:5001/admin/statistics', {
                params: {
                    fromId: userID,
                    to: filterValue
                },
            });
            const data = response.data;
            const modifiedData = data.map((item) => ({
                name: item.from.name,
                count: item.count,
            }));
            setStatisticsData(modifiedData);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchTopics() {
        try {
            const response = await axios.get('http://localhost:5001/admin/topics');
            const data = response.data;
            const topicNames = data.map((topic) => topic.topicName);
            setTopics(topicNames);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>Statistics</h2>
            <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                <option value="">All</option>
                {topics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                ))}
            </select>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {statisticsData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Statistics;
