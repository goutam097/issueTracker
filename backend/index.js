require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Issue Schema
const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Backlog', 'In Progress', 'Done'], default: 'Backlog' },
    assignee: String,
    labels: [String],
    createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model('Issue', issueSchema);

// Routes
app.get('/issues', async (req, res) => {
    const issues = await Issue.find();
    res.json(issues);
});

app.post('/issues', async (req, res) => {
    const issue = new Issue(req.body);
    try {
        const savedIssue = await issue.save();
        res.status(201).json(savedIssue);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/issues/:id', async (req, res) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedIssue);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/issues/:id', async (req, res) => {
    try {
        await Issue.findByIdAndDelete(req.params.id);
        res.json({ message: 'Issue deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
