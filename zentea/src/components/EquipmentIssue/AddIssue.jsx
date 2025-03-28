import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddIssue = () => {
  const [issueData, setIssueData] = useState({
    serial_number: '',
    issue_title: '',
    description: '',
    priority_level: 'Low',
    assign_technician: '',
    maintenance_cost: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueData({
      ...issueData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/issues/addIssue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add issue');
      }

      const result = await response.json();
      alert('Issue added successfully!');
      navigate('/IssueDetails');
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to connect to server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Styles (same as before)
  const containerStyle = {
    marginLeft:'400px',
    Width: '3000px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
    backgroundColor:'#F5F7F8'
  };

  const cardStyle = {
    backgroundColor: '#D8D9DA',
    width:"600px",
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgb(242, 242, 242)',
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

  const requiredFields = ['serial_number', 'issue_title', 'description', 'priority_level', 'maintenance_cost'];
  const isFormValid = requiredFields.every(field => {
    const value = issueData[field];
    return value !== '' && value !== null && value !== undefined;
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Report New Issue</h2>
        
        {/* Error message display */}
        {error && (
          <div style={{
            backgroundColor: '#fff5f5',
            color: '#ff6b6b',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Serial Number*</label>
            <input
              type="text"
              name="serial_number"
              value={issueData.serial_number}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter serial number"
            />
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Issue Title*</label>
            <input
              type="text"
              name="issue_title"
              value={issueData.issue_title}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter issue title"
            />
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Description*</label>
            <textarea
              name="description"
              value={issueData.description}
              onChange={handleChange}
              style={textareaStyle}
              required
              placeholder="Describe the issue in detail"
            />
          </div>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Priority Level*</label>
            <select
              name="priority_level"
              value={issueData.priority_level}
              onChange={handleChange}
              style={selectStyle}
              required
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
            <label style={labelStyle}>Maintenance Cost ($)*</label>
            <input
              type="number"
              name="maintenance_cost"
              value={issueData.maintenance_cost}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          
          <button
            type="submit"
            style={{
              ...buttonStyle,
              ...(!isFormValid || submitting ? buttonDisabledStyle : {}),
            }}
            disabled={!isFormValid || submitting}
          >
            {submitting ? 'Submitting...' : 'Report Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;