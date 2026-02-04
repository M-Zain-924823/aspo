import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // 1. Tell App.jsx to set isLoggedIn = false
    onLogout();
    // 2. Go back to home
    navigate('/');
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 30px', 
      background: '#333', 
      color: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      {/* Left Side: App Title */}
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>PLANiA</h1>
        </Link>
      </div>

      {/* Right Side: Buttons */}
      <nav>
        {/* Scenario 1: User is Logged In */}
        {isLoggedIn ? (
          <div style={{ display: 'flex', gap: '15px' }}>
            {/* If on Planner, show Home. If on Home, show Planner */}
            {location.pathname === '/planner' ? (
              <Link to="/">
                <button className="btn-secondary">Dashboard</button>
              </Link>
            ) : (
              <Link to="/planner">
                <button className="btn-primary">PLAN THE SCHEDULE</button>
              </Link>
            )}
            
            {/* The Logout Button */}
            <button className="btn-secondary" onClick={handleLogoutClick} style={{borderColor: '#ff4d4d', color: '#ff4d4d'}}>
              Logout
            </button>
          </div>
        ) : (
          /* Scenario 2: User is Guest (Not Logged In) */
          <div style={{ gap: '10px', display: 'flex' }}>
            {/* Both go to Login page for now */}
            <Link to="/login">
              <button className="btn-secondary" onClick={() => setIsSignup(!isSignup)}>Login</button>
            </Link>
            <Link to="/login">
              <button className="btn-primary" onClick={() => setIsSignup(!isSignup)}>Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;