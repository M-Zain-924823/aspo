import React, { useState } from 'react';
import '../App.css'; 
import { Upload, Plus, Trash2, Save, X, Edit } from 'lucide-react'; // Fixed imports
import EditModal from '../components/EditModal'; // Import the modal

const StudyPlanner = () => {
  // --- STATE MANAGEMENT ---
  const [subjectName, setSubjectName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [file, setFile] = useState(null);
  
  // State for the Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  // Fake Database of subjects
  const [mySubjects, setMySubjects] = useState([
    { id: 1, name: "Artificial Intelligence", date: "2026-06-15", difficulty: "Hard" },
    { id: 2, name: "Web Engineering", date: "2026-05-20", difficulty: "Easy" }
  ]);

  // --- HANDLERS ---

  // 1. Submit New Subject
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectName || !examDate) {
      alert("Please fill in the Subject Name and Exam Date!");
      return;
    }

    const newSubject = {
      id: Date.now(),
      name: subjectName,
      date: examDate,
      difficulty: difficulty
    };

    setMySubjects([...mySubjects, newSubject]);
    
    // Reset Form
    setSubjectName('');
    setExamDate('');
    setDifficulty('Medium');
    setFile(null);
    alert("Subject Added!");
  };

  // 2. Delete Subject
  const handleDelete = (id) => {
    setMySubjects(mySubjects.filter(sub => sub.id !== id));
  };

  // 3. Open Edit Modal
  const handleEditClick = (subject) => {
    setEditingSubject(subject);
    setIsEditModalOpen(true);
  };

  // 4. Save Changes from Modal
  const handleSaveChanges = (updatedSubject) => {
    setMySubjects(mySubjects.map(sub => 
      sub.id === updatedSubject.id ? updatedSubject : sub
    ));
    alert("Subject Updated Successfully!");
  };

  return (
    <div className="planner-container">
      
      {/* LEFT SIDE: Add Subject Form */}
      <div className="form-card">
        <h2><Plus size={20}/> Add New Subject</h2>
        <p style={{color: '#666', fontSize: '0.9rem', marginBottom: '20px'}}>
          Enter your course details so AI can generate your schedule.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject Name</label>
            <input 
              type="text" 
              placeholder="e.g. Data Structures" 
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Exam Date</label>
            <input 
              type="date" 
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Difficulty Level</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload Study Material (PDF/PPT)</label>
            <div className="file-upload-wrapper">
              <Upload size={16} />
              <span>{file ? file.name : "Choose File"}</span>
              <input 
                type="file" 
                className="hidden-input"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="btn-cancel" onClick={() => setSubjectName('')}>
              <X size={16} /> Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} /> Submit
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE: List of Subjects */}
      <div className="list-card">
        <h2>Your Subjects</h2>
        {mySubjects.length === 0 ? (
          <p>No subjects added yet.</p>
        ) : (
          <ul className="subject-list">
            {mySubjects.map((sub) => (
              <li key={sub.id} className="subject-item">
                <div>
                  <strong>{sub.name}</strong>
                  <br/>
                  <small>Exam: {sub.date} | Lvl: {sub.difficulty}</small>
                </div>
                
                {/* Action Buttons (Edit & Delete) */}
                <div style={{display: 'flex', gap: '10px'}}>
                  <button className="btn-delete" onClick={() => handleEditClick(sub)}>
                    <Edit size={16} color="blue" />
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(sub.id)}>
                    <Trash2 size={16} color="red" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* THE MODAL (Hidden unless open) */}
      <EditModal 
        isOpen={isEditModalOpen}
        subject={editingSubject}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveChanges}
      />

    </div>
  );
};

export default StudyPlanner;