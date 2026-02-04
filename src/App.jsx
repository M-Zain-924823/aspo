import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import StudyPlanner from './pages/StudyPlanner';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // New Bucket for the Name

  // Modified Login function to accept the name
  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUsername(name); // Save the name
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(''); // Clear the name
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {/* Pass the username to the Dashboard */}
        <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} username={username} />} />
        
        {/* Pass the handleLogin function to Login page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        <Route path="/planner" element={<StudyPlanner />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;