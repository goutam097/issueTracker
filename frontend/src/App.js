import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import CreateIssue from './components/CreateIssue';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<CreateIssue />} />
            </Routes>
        </Router>
  );
}

export default App;
