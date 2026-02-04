import React, { useState, useEffect } from 'react';
import { Save, X, Upload } from 'lucide-react';
import '../App.css'; 

const EditModal = ({ isOpen, subject, onClose, onSave }) => {
  // 1. Internal state for the form inside the modal
  const [editedName, setEditedName] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedDifficulty, setEditedDifficulty] = useState('Medium');
  const [editedFile, setEditedFile] = useState(null);

  // 2. When the modal opens, fill the form with the subject's CURRENT data
  useEffect(() => {
    if (subject) {
      setEditedName(subject.name);
      setEditedDate(subject.date);
      setEditedDifficulty(subject.difficulty);
      // We don't pre-fill the file because for security browsers don't let you
    }
  }, [subject, isOpen]);

  if (!isOpen) return null; // Don't show anything if not open

  const handleSubmit = (e) => {
    e.preventDefault();
    // 3. Create the updated object
    const updatedSubject = {
      ...subject, // keep old ID
      name: editedName,
      date: editedDate,
      difficulty: editedDifficulty,
      file: editedFile // Send this to backend later
    };
    
    // 4. Send it back to the parent
    onSave(updatedSubject);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Subject</h3>
          <button onClick={onClose} className="btn-icon"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject Name</label>
            <input 
              value={editedName} 
              onChange={(e) => setEditedName(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label>Exam Date</label>
            <input 
              type="date" 
              value={editedDate} 
              onChange={(e) => setEditedDate(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Difficulty</label>
            <select 
              value={editedDifficulty} 
              onChange={(e) => setEditedDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Add New Material (PDF)</label>
            <div className="file-upload-wrapper">
              <Upload size={16} />
              <span>{editedFile ? editedFile.name : "Upload New File"}</span>
              <input 
                type="file" 
                className="hidden-input"
                onChange={(e) => setEditedFile(e.target.files[0])}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{width: '100%'}}>
            <Save size={16} style={{marginRight: '5px'}}/> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;