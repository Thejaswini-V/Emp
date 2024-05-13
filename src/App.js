// App.js
import React, { useState } from 'react';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import EmployeeTable from './EmployeeTable';

import axios from 'axios';

const App = () => {
  const [firstFormData, setFirstFormData] = useState(null);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);
  const [showFirstForm, setShowFirstForm] = useState(true); // Track whether to show the first form

  const toggleEmployeeTable = () => {
    setShowEmployeeTable(!showEmployeeTable);
  };

  const handleFirstFormSubmit = (data) => {
    setFirstFormData(data);
    setShowSecondForm(true);
    setShowFirstForm(false); // Hide the first form when moving to the second form
  };

  const handleSecondFormSubmit = (data) => {
    // Combine data from both forms
    const formData = { ...firstFormData, ...data };

    // Send form data to the backend
    axios.post('http://localhost:5000/submit-form', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
        // Handle error
        // For example, show an error message to the user
      });
  };

  const handleBackToFirstForm = () => {
    setShowSecondForm(false);
    setShowFirstForm(true); // Show the first form again when navigating back
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>EMPLOYEE MANAGEMENT</h1>
      {showFirstForm && <FirstForm onNext={handleFirstFormSubmit} />}
      {showSecondForm && (
        <div>
          <SecondForm onSubmit={handleSecondFormSubmit} onToggleTable={toggleEmployeeTable} onBack={handleBackToFirstForm} />
          {showEmployeeTable && <EmployeeTable />}
        </div>
      )}
    </div>
  );
};

export default App;