import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, BookOpen, Clock } from 'lucide-react'; // Added Icons
import '../App.css';

// 1. Accept 'username' as a prop
const Dashboard = ({ isLoggedIn, username }) => {
  
  const progressPercentage = 65; 
  
  const weeklyPlan = [
    { day: "Mon", focus: "Data Structures", hours: 2 },
    { day: "Tue", focus: "Web Dev", hours: 3 },
    { day: "Wed", focus: "AI Logic", hours: 1.5 },
    { day: "Thu", focus: "Networking", hours: 2 },
    { day: "Fri", focus: "Relax / Review", hours: 1 },
    { day: "Sat", focus: "Project Work", hours: 4 },
  ];

  // 2. State for Tasks (So we can update them)
  const [tasks, setTasks] = useState([
    { id: 1, title: "Watch React Tutorial", isCompleted: true },
    { id: 2, title: "Read Chapter 4 of AI", isCompleted: false },
    { id: 3, title: "Submit Packet Tracer Lab", isCompleted: false },
    { id: 4, title: "Update Planner Specs", isCompleted: false },
  ]);

  // 3. Function to Toggle Task Status
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  return (
    <div className="dashboard">
      
      {/* Guest View */}
      {!isLoggedIn && (
        <div className="hero-section">
          <h1>Welcome to PLANiA</h1>
          <p>ASPO: Ai-based Study Planner and Organizer</p>
          <Link to="/login"><button className="btn-primary">Login / Sign Up</button></Link>
        </div>
      )}

      {/* User View */}
      {isLoggedIn && (
        <>
          {/* Header Section */}
          <div style={{marginBottom: '30px'}}>
            <h1>Welcome back, <span style={{color: 'var(--primary)'}}>{username}</span>! 👋</h1>
            <p>You are on track to crush your exams.</p>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
              <strong>Exam Readiness</strong>
              <span>{progressPercentage}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div>
            <h2 className="section-title">Weekly Schedule</h2>
            <div className="weekly-container">
              {weeklyPlan.map((item, index) => (
                <div key={index} className="day-card">
                  <h3>{item.day}</h3>
                  <p style={{color: '#666'}}><BookOpen size={14}/> {item.focus}</p>
                  <p style={{color: '#888', fontSize: '0.9rem'}}><Clock size={14}/> {item.hours} hrs</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Daily Tasks */}
          <div style={{ marginTop: '30px' }}>
            <h2 className="section-title">Today's Tasks</h2>
            <div className="task-list">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="task-item" 
                  onClick={() => toggleTask(task.id)} // Click to toggle
                  style={{ cursor: 'pointer', opacity: task.isCompleted ? 0.5 : 1 }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    {/* Swap Icon based on status */}
                    {task.isCompleted ? <CheckCircle color="green" size={20}/> : <Circle color="#ccc" size={20}/>}
                    
                    <span style={{ 
                      textDecoration: task.isCompleted ? 'line-through' : 'none' 
                    }}>
                      {task.title}
                    </span>
                  </div>
                  
                  <span style={{ 
                    fontSize: '0.8rem', 
                    padding: '2px 8px', 
                    borderRadius: '10px',
                    background: task.isCompleted ? '#d4edda' : '#fff3cd',
                    color: task.isCompleted ? '#155724' : '#856404'
                  }}>
                    {task.isCompleted ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;