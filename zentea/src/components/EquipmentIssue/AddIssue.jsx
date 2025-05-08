import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddIssue = () => {
  const [issueData, setIssueData] = useState({
    serial_number: '',
    issue_title: '',
    description: '',
    priority_level: 'Low',
    assign_technician: '',
    maintenance_cost: ''
  });
  const [equipments, setEquipments] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/equipments');
        if (response.data?.equipments) {
          setEquipments(response.data.equipments);
        }
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };
    fetchEquipments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for serial number to prevent symbols
    if (name === 'serial_number') {
      const filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
      setIssueData({
        ...issueData,
        [name]: filteredValue,
      });
    } else {
      setIssueData({
        ...issueData,
        [name]: value,
      });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!issueData.serial_number.trim()) {
      newErrors.serial_number = 'Serial number is required';
    } else if (issueData.serial_number.length < 2) {
      newErrors.serial_number = 'Serial number should be at least 2 characters';
    }
    
    if (!issueData.issue_title.trim()) {
      newErrors.issue_title = 'Issue title is required';
    } else if (issueData.issue_title.length < 3) {
      newErrors.issue_title = 'Title should be at least 3 characters';
    }
    
    if (!issueData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (issueData.description.length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }
    
    if (!issueData.maintenance_cost) {
      newErrors.maintenance_cost = 'Maintenance cost is required';
    } else if (isNaN(issueData.maintenance_cost) || parseFloat(issueData.maintenance_cost) < 0) {
      newErrors.maintenance_cost = 'Please enter a valid positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setError(null);

    try {
      // First verify backend connection
      try {
        const healthCheck = await fetch('http://localhost:8070', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!healthCheck.ok) {
          throw new Error('Backend server is not responding properly');
        }
      } catch (healthError) {
        throw new Error('Cannot connect to backend server. Please ensure:\n1. Backend is running\n2. Port 8070 is correct\n3. No network restrictions');
      }

      // Submit the form data
      const response = await fetch('http://localhost:8070/issues/addIssue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...issueData,
          maintenance_cost: parseFloat(issueData.maintenance_cost)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Server rejected the request');
      }

      const result = await response.json();
      alert('Issue added successfully!');
      navigate('/IssueDetails');
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Styles (same as original)
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    marginLeft:"500px",
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
  };

  const cardStyle = {
    backgroundColor: 'white',
    width:'500xp',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  };

  const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1.5rem',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#495057',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8f9fa',
  };

  const errorStyle = {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%236c757d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '16px',
  };

  const buttonStyle = {
    padding: '0.875rem 1.5rem',
    backgroundColor: '#3a86ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
  };

  const buttonDisabledStyle = {
    backgroundColor: '#e9ecef',
    color: '#adb5bd',
    cursor: 'not-allowed',
  };

  const isFormValid = () => {
    return (
      issueData.serial_number.trim() && issueData.serial_number.length >= 2 &&
      issueData.issue_title.trim() && issueData.issue_title.length >= 3 &&
      issueData.description.trim() && issueData.description.length >= 10 &&
      issueData.maintenance_cost && !isNaN(issueData.maintenance_cost) && 
      parseFloat(issueData.maintenance_cost) >= 0
    );
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Report New Issue</h2>
        
        {error && (
          <div style={{
            backgroundColor: '#fff5f5',
            color: '#ff6b6b',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            whiteSpace: 'pre-line'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Serial Number*</label>
            <select
              name="serial_number"
              value={issueData.serial_number}
              onChange={handleChange}
              style={errors.serial_number ? errorInputStyle : selectStyle}
              required
            >
              <option value="">Select Equipment</option>
              {equipments.map(equipment => (
                <option key={equipment._id} value={equipment.serial_number}>
                  {equipment.serial_number} - {equipment.eqm_name}
                </option>
              ))}
            </select>
            {errors.serial_number && <div style={errorStyle}>{errors.serial_number}</div>}
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Issue Title*</label>
            <input
              type="text"
              name="issue_title"
              value={issueData.issue_title}
              onChange={handleChange}
              style={errors.issue_title ? errorInputStyle : inputStyle}
              placeholder="Enter issue title (min 3 chars)"
            />
            {errors.issue_title && <div style={errorStyle}>{errors.issue_title}</div>}
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Description*</label>
            <textarea
              name="description"
              value={issueData.description}
              onChange={handleChange}
              style={errors.description ? {...textareaStyle, ...errorInputStyle} : textareaStyle}
              placeholder="Describe the issue in detail (min 10 chars)"
            />
            {errors.description && <div style={errorStyle}>{errors.description}</div>}
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Priority Level*</label>
            <select
              name="priority_level"
              value={issueData.priority_level}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Assign Technician</label>
            <input
              type="text"
              name="assign_technician"
              value={issueData.assign_technician}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Technician name or ID"
            />
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Maintenance Cost (LKR)*</label>
            <input
              type="number"
              name="maintenance_cost"
              value={issueData.maintenance_cost}
              onChange={handleChange}
              style={errors.maintenance_cost ? errorInputStyle : inputStyle}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.maintenance_cost && <div style={errorStyle}>{errors.maintenance_cost}</div>}
          </div>
          
          <button
            type="submit"
            style={{
              ...buttonStyle,
              ...(!isFormValid() || submitting ? buttonDisabledStyle : {}),
            }}
            disabled={!isFormValid() || submitting}
          >
            {submitting ? 'Submitting...' : 'Report Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;