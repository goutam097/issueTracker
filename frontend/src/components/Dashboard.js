import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/issues')
            .then((response) => setIssues(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Issue Tracker Dashboard</h1>
            <Link to="/create">Create New Issue</Link>
            <ul>
                {issues.map((issue) => (
                    <li key={issue._id}>
                        <h3>{issue.title}</h3>
                        <p>{issue.description}</p>
                        <p>Status: {issue.status}</p>
                        <p>Priority: {issue.priority}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
