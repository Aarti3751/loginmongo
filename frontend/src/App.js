import './App.css';
import PlaintextExample from './Components/PlaintextExample';
import Login from './Components/Login';
import Dashboard from './Components/Dashbord';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Register</Link>
          <Link to="/login">Login</Link>
        
        </nav>

        <Routes>
          <Route path="/" element={<PlaintextExample />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
