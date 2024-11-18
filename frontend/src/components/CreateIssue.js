import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateIssue = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Backlog',
        assignee: '',
        labels: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/issues', {
            ...formData,
            labels: formData.labels.split(',').map((label) => label.trim()),
        })
            .then(() => navigate('/'))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Issue</h2>
            <label>
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </label>
            <br />
            <label>
                Priority:
                <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </label>
            <br />
            <label>
                Assignee:
                <input type="text" name="assignee" value={formData.assignee} onChange={handleChange} />
            </label>
            <br />
            <label>
                Labels (comma-separated):
                <input type="text" name="labels" value={formData.labels} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Create Issue</button>
        </form>
    );
};

export default CreateIssue;
