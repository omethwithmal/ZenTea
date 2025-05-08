import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const IssueDetails = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch all issues
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('http://localhost:8070/issues');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIssues(data.issue || []);
        setFilteredIssues(data.issue || []);
      } catch (err) {
        console.error('Error fetching issues:', err);
        alert('Failed to connect to server. Please make sure the backend is running.');
      }
    };
    fetchIssues();
  }, []);

  // Filter issues based on search term
  useEffect(() => {
    const filtered = issues.filter(issue => 
      issue.issue_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.assign_technician && issue.assign_technician.toLowerCase().includes(searchTerm.toLowerCase())) ||
      issue.priority_level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIssues(filtered);
  }, [searchTerm, issues]);

  // Navigate to the Issue Update page
  const handleEdit = (issueId) => {
    navigate(`/issues/update/${issueId}`);
  };

  // Handle Delete Issue
  const handleDelete = async (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        const response = await fetch(`http://localhost:8070/issues/deleteIssue/${issueId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          const updatedIssues = issues.filter((issue) => issue._id !== issueId);
          setIssues(updatedIssues);
          alert('Issue deleted successfully!');
        } else {
          alert('Error deleting issue');
        }
      } catch (error) {
        console.error('Error deleting issue:', error);
      }
    }
  };

  // Generate PDF Report (modified version)
  const generateReport = () => {
    if (!filteredIssues.length) {
      alert("No issues available to generate report");
      return;
    }

    // Create a temporary table for the report
    const reportTable = document.createElement('div');
    reportTable.style.position = 'absolute';
    reportTable.style.left = '-9999px';
    reportTable.style.width = '100%';
    
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    
    // Create table header without Actions column
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['#', 'Serial Number', 'Issue Title', 'Description', 'Priority', 'Technician', 'Cost'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      th.style.border = '1px solid #ddd';
      th.style.padding = '8px';
      th.style.textAlign = 'left';
      th.style.backgroundColor = '#f2f2f2';
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body without Actions column
    const tbody = document.createElement('tbody');
    filteredIssues.forEach((issue, index) => {
      const row = document.createElement('tr');
      
      [
        index + 1,
        issue.serial_number,
        issue.issue_title,
        issue.description,
        issue.priority_level,
        issue.assign_technician || 'Not Assigned',
        `LKR ${issue.maintenance_cost}`
      ].forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        td.style.border = '1px solid #ddd';
        td.style.padding = '8px';
        
        // Apply priority color styling
        if (text === 'High') td.style.color = '#ff6b6b';
        if (text === 'Medium') td.style.color = '#ff922b';
        if (text === 'Low') td.style.color = '#51cf66';
        
        row.appendChild(td);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    reportTable.appendChild(table);
    document.body.appendChild(reportTable);
    
    // Generate PDF from the temporary table
    html2canvas(reportTable, {
      scale: 2,
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Clean up
      document.body.removeChild(reportTable);
      
      pdf.save('issue-report.pdf');
    });
  };

  // Prepare email data
  const handleEmail = (issue) => {
    const body = `
Issue Title: ${issue.issue_title}
Serial Number: ${issue.serial_number}
Priority: ${issue.priority_level}
Description: ${issue.description}
Maintenance Cost: LKR ${issue.maintenance_cost}
Technician: ${issue.assign_technician || 'Not Assigned'}
    `.trim();
    const subject = `Issue Details - ${issue.issue_title}`;
    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`;
    window.open(gmailUrl, '_blank');
  };

  // Styles
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  };

  const mainContentStyle = {
    flex: '1',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
    maxWidth: 'calc(100% - 250px)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0',
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const addButtonStyle = {
    backgroundColor: '#3a86ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 8px rgba(58, 134, 255, 0.3)',
    transition: 'all 0.2s ease',
  };

  const reportButtonStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 8px rgba(108, 117, 125, 0.3)',
    transition: 'all 0.2s ease',
  };

  const searchContainerStyle = {
    marginBottom: '1.5rem',
    display: 'flex',
    gap: '1rem',
  };

  const searchInputStyle = {
    flex: '1',
    padding: '0.875rem 1rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  };

  const thStyle = {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid #e9ecef',
  };

  const tdStyle = {
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '1px solid #e9ecef',
    backgroundColor: 'white',
    transition: 'background-color 0.2s ease',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#f8f9fa',
    color: '#3a86ff',
    fontWeight: '500',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  };

  const deleteButtonStyle = {
    backgroundColor: '#fff5f5',
    color: '#ff6b6b',
  };

  const emailButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
  };

  const noResultsStyle = {
    padding: '2rem',
    textAlign: 'center',
    color: '#6c757d',
    backgroundColor: 'white',
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px 0',
    minHeight: '100vh',
    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
    position: 'sticky',
    top: '0',
  };

  const sidebarHeaderStyle = {
    textAlign: 'center',
    padding: '20px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const navLinkStyle = {
    display: 'block',
    padding: '15px 20px',
    color: 'white',
    textDecoration: 'none',
    borderLeft: '4px solid transparent',
    transition: 'all 0.2s ease',
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.28)'
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>
          <i className="fas fa-cogs" style={{ fontSize: '40px', marginBottom: '10px' }}></i>
          <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Equipment</h1>
          <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
        </div>
        <nav style={{ marginTop: '20px' }}>
          <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/EquipmentDashboard'); }}>
            <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
            <span>Equipment Details</span>
          </a>
          <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/MaintenanceSchedule'); }}>
            <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
            <span>Maintenance Schedule</span>
          </a>
          <a href="#" style={activeNavLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/IssueDetails'); }}>
            <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
            <span>Failure Details</span>
          </a>
          <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/EqmNotification'); }}>
            <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
            <span>Notifications</span>
          </a>
          <a href="#" style={navLinkStyle}>
            <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
            <span>Settings</span>
          </a>
          <a href="#" style={navLinkStyle}>
            <i className="fas fa-tools" style={{ marginRight: '10px' }}></i>
            <span>Log Out</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Equipment Failure Management</h2>
          <div style={buttonGroupStyle}>
            <button 
              style={addButtonStyle}
              onClick={() => navigate('/AddIssue')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2671e0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3a86ff'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Issue
            </button>
            <button 
              style={reportButtonStyle}
              onClick={generateReport}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17V7M9 7L5 11M9 7L13 11M15 7V17M15 17L19 13M15 17L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Generate Report
            </button>
          </div>
        </div>
        
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search here..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div id="report-table">
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Serial Number</th>
                <th style={thStyle}>Issue Title</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Priority</th>
                <th style={thStyle}>Technician</th>
                <th style={thStyle}>Cost</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue, index) => (
                  <tr key={issue._id} style={{ ':hover': { backgroundColor: '#f8f9fa' } }}>
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{issue.serial_number}</td>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>{issue.issue_title}</td>
                    <td style={tdStyle}>{issue.description}</td>
                    <td style={{
                      ...tdStyle,
                      color: issue.priority_level === 'High' ? '#ff6b6b' : 
                            issue.priority_level === 'Medium' ? '#ff922b' : '#51cf66',
                      fontWeight: '500'
                    }}>
                      {issue.priority_level}
                    </td>
                    <td style={tdStyle}>{issue.assign_technician || 'Not Assigned'}</td>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>LKR {issue.maintenance_cost}</td>
                    <td style={tdStyle}>
                      <button 
                        style={buttonStyle}
                        onClick={() => handleEdit(issue._id)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      >
                        Edit
                      </button>
                      <button
                        style={{ ...buttonStyle, ...deleteButtonStyle }}
                        onClick={() => handleDelete(issue._id)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffe3e3'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                      >
                        Delete
                      </button>
                      <button
                        style={{ ...buttonStyle, ...emailButtonStyle }}
                        onClick={() => handleEmail(issue)}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                      >
                        Email
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={noResultsStyle}>
                    {searchTerm ? 'No issues match your search.' : 'No issues found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;