// SecondForm.js
import React, { useState } from 'react';
import './SecondForm.css'; // Import the CSS file

const SecondForm = ({ onSubmit, onToggleTable, onBack }) => {
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, bloodGroup });
    setAddress('');
    setBloodGroup('');
  };

  return (
    <div>
      <button className="back-button" onClick={onBack}>Back</button>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={address} onChange={handleAddressChange} />
          </div>
          <div className="form-group">
            <label>Blood Group:</label>
            <select value={bloodGroup} onChange={handleBloodGroupChange}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
        <button onClick={onToggleTable}>View Employees</button>
      </div>
    </div>
  );
};

export default SecondForm;