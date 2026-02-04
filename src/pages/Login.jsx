import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // We'll add some specific styles for this

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup
  const navigate = useNavigate(); // Hook to move user to another page

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Signup specific states
  const [fullName, setFullName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Simple Validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (isSignup && password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    // 2. Fake Backend Call
    console.log(isSignup ? "Signing up..." : "Logging in...");
    
    // 3. Trigger the App to switch to "Logged In" mode
    const nameToSend = isSignup ? fullName : "Student"; 
    onLogin(nameToSend);
    // 4. Redirect to Dashboard
    navigate('/'); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p className="subtitle">
          {isSignup ? "Join PLANiA to organize your studies." : "Login to access your dashboard."}
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* Show these fields ONLY if Signing Up */}
          {isSignup && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Zain..." 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="name@nutech.edu.pk" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password for Signup */}
          {isSignup && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••" 
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '10px'}}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="toggle-text">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login here" : "Sign up here"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;