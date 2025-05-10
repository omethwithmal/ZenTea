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
    accountNumber: employeeData.accountNumber || '',
    basicSalary: employeeData.finalSalary || '',
    date: new Date().toISOString().split('T')[0],
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    accountNumber: ''
  });

  useEffect(() => {
    if (employeeData) {   
      setFormData(prev => ({
        ...prev,
        employeename: employeeData.firstName || '',
        employeeID: employeeData.employeeID || '',
        accountNumber: employeeData.accountNumber || '',
        basicSalary: employeeData.finalSalary || '',
      }));
    }
  }, [employeeData]);

  const validateAccountNumber = (accountNumber) => {
    // Basic validation - adjust according to your requirements
    if (!accountNumber) {
      return 'Account number is required';
    }
    if (!/^\d+$/.test(accountNumber)) {
      return 'Account number should contain only numbers';
    }
    if (accountNumber.length < 8) {
      return 'Account number should be at least 8 digits';
    }
    if (accountNumber.length > 20) {
      return 'Account number should not exceed 20 digits';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate account number in real-time
    if (name === 'accountNumber') {
      const error = validateAccountNumber(value);
      setValidationErrors(prev => ({
        ...prev,
        accountNumber: error
      }));
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const accountError = validateAccountNumber(formData.accountNumber);
    setValidationErrors({
      accountNumber: accountError
    });
    return !accountError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setError('Please fix the validation errors');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8070/esalarys/add', formData);
      
      if (response.data.message) {
        setSuccess('Salary payment recorded successfully!');
        setFormData(prev => ({
          ...prev,
          accountNumber: '',
          date: new Date().toISOString().split('T')[0]
        }));
        setTimeout(() => {
          navigate('/FinancialDashboard');
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
              border: validationErrors.accountNumber ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: "#f4f4f4",
              color: 'black'
            }}
          />
          {validationErrors.accountNumber && (
            <div style={{
              color: 'red',
              fontSize: '12px',
              marginTop: '5px'
            }}>
              {validationErrors.accountNumber}
            </div>
          )}
        </div>

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

        <button
          type="submit"
          disabled={!!validationErrors.accountNumber}
          style={{
            width: '100%',
            padding: '10px',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            background: validationErrors.accountNumber 
              ? '#cccccc' 
              : 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
            opacity: validationErrors.accountNumber ? 0.7 : 1
          }}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default EmployeeSalaryPayment;