import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateIssue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issueData, setIssueData] = useState({
    serial_number: '',
    issue_title: '',
    description: '',
    priority_level: 'Low',
    assign_technician: '',
    maintenance_cost: ''
  });

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await fetch(`http://localhost:5000/issues/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch issue');
        }
        const data = await response.json();
        setIssueData(data.issue);
      } catch (error) {
        console.error('Error fetching issue:', error);
        alert('Error loading issue data');
        navigate('/IssueDetails');
      }
    };
    fetchIssue();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueData({
      ...issueData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/issues/updateIssue/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
      });

      if (response.ok) {
        alert('Issue updated successfully!');
        navigate('/IssueDetails');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error updating issue');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating issue');
    }
  };

  // Styles (same as AddIssue)
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
  };

  const cardStyle = {
    backgroundColor: 'white',
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

  const requiredFields = ['serial_number', 'issue_title', 'description', 'priority_level', 'maintenance_cost'];
  const isFormValid = requiredFields.every(field => issueData[field]);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Update Issue</h2>
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
              min="0"
              step="0.01"
            />
          </div>
          
          <button
            type="submit"
            style={{
              ...buttonStyle,
              ...(!isFormValid ? { backgroundColor: '#e9ecef', color: '#adb5bd', cursor: 'not-allowed' } : {}),
            }}
            disabled={!isFormValid}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#2671e0')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#3a86ff')}
          >
            Update Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateIssue;