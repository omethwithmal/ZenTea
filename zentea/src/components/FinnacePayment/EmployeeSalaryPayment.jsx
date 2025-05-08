import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeSalaryPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const employeeData = state?.employee || {};

  const [formData, setFormData] = useState({
    employeename: employeeData.firstName || '',
    employeeID: employeeData.employeeID || '',    
    accountNumber: '',
    basicSalary: employeeData.finalSalary || '',
    otHours: employeeData.otHours || '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update form data when employeeData changes
  useEffect(() => {
    if (employeeData) {   
      setFormData(prev => ({
        ...prev,
        employeename: employeeData.firstName || '',
        employeeID: employeeData.employeeID || '',
        basicSalary: employeeData.finalSalary || '',
        otHours: employeeData.otHours || ''
      }));
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate form data
      if (!formData.accountNumber || !formData.otHours) {
        throw new Error('Account number and OT hours are required');
      }

      // Send data to backend
      const response = await axios.post('http://localhost:8070/esalarys/add', formData);
      
      if (response.data.message) {
        setSuccess('Salary payment recorded successfully!');
        // Reset form after successful submission
        setFormData(prev => ({
          ...prev,
          accountNumber: '',
          otHours: '',
          date: new Date().toISOString().split('T')[0]
        }));
        // Optionally navigate to another page after delay
        setTimeout(() => {
          navigate('/FinancialDashboard'); // Adjust this to your desired route
        }, 2000);
      }
    } catch (err) {
      console.error('Error submitting salary payment:', err);
      setError(err.response?.data?.error || err.message || 'Failed to record salary payment');
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        width: '700px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f4f4f4',
        marginLeft: '400px',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#0a8700',
          marginBottom: '20px',
        }}
      >
        Employee Salary Payment
      </h2>
      
      {error && (
        <div style={{
          color: 'red',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid red',
          borderRadius: '4px',
          backgroundColor: '#ffebee'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{
          color: 'green',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid green',
          borderRadius: '4px',
          backgroundColor: '#e8f5e9'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Employee Name */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Employee Name:
          </label>
          <input
            type="text"
            name="employeename"
            value={formData.employeename}
            onChange={handleChange}
            required
            readOnly
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: "#e9e9e9",
              color: 'black'
            }}
          />
        </div>

        {/* Employee ID */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Employee ID:
          </label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            required
            readOnly
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: "#e9e9e9",
              color: 'black'
            }}
          />
        </div>

        {/* Account Number */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Account Number:
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Enter Account Number"
            required 
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: "#f4f4f4",
              color: 'black'
            }}
          />
        </div>

        {/* Basic Salary */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Basic Salary:
          </label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            required
            readOnly
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: "#e9e9e9",
              color: 'black'
            }}
          />
        </div>

        {/* OT Hours */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Overtime (OT) Hours:
          </label>
          <input
            type="number"
            name="otHours"
            value={formData.otHours}
            onChange={handleChange}
            placeholder="Enter OT Hours"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: "#f4f4f4",
              color: 'black'
            }}
          />
        </div>

        {/* Payment Date */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Payment Date:
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: "#f4f4f4",
              color: 'black'
            }}
          />
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
          }}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default EmployeeSalaryPayment;