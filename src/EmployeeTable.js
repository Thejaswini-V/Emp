import React, { useEffect, useState, useCallback, useRef } from 'react';
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColumn, setFilterColumn] = useState('name'); // Default to filtering by name

  const fetchEmployeesRef = useRef(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }, []);

  useEffect(() => {
    fetchEmployeesRef.current = fetchEmployees;
    fetchEmployeesRef.current();
  }, [fetchEmployees]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterColumn(e.target.value);
  };

  const handleDelete = useCallback(async (id) => {
    try {
      await fetch('http://localhost:5000/employees/${id}', {
        method: 'DELETE',
      });
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }, [employees]);

  const filteredEmployees = employees.filter((employee) =>
    employee[filterColumn].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-table-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={filterColumn} onChange={handleFilterChange}>
          <option value="name">Name</option>
          <option value="date_of_birth">Date of Birth</option>
          <option value="employee_id">Employee ID</option>
          <option value="salary">Salary</option>
          <option value="gender">Gender</option>
          <option value="department">Department</option>
          <option value="designation">Designation</option>
          <option value="address">Address</option>
          <option value="blood_group">Blood Group</option>
        </select>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Employee ID</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Address</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.date_of_birth}</td>
              <td>{employee.employee_id}</td>
              <td>{employee.salary}</td>
              <td>{employee.gender}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.address}</td>
              <td>{employee.blood_group}</td>
              <td>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;