import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MaintenanceRevenue = () => {
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

  // Handle back navigation to FinancialDashboard
  const handleBack = () => {
    navigate('/FinancialDashboard');
  };

  // Generate PDF Report
  const generateReport = () => {
    const input = document.getElementById('report-table');
    
    html2canvas(input, {
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

      pdf.save('issue-report.pdf');
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    });
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

  const backButtonStyle = {
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

  const reportButtonStyle = {
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

  const noResultsStyle = {
    padding: '2rem',
    textAlign: 'center',
    color: '#6c757d',
    backgroundColor: 'white',
  };

  return (
    <div style={containerStyle}>
      {/* Main Content */}
      <div style={mainContentStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Issue Management</h2>
          <div style={buttonGroupStyle}>
            <button 
              style={backButtonStyle}
              onClick={handleBack}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Dashboard
            </button>
            <button 
              style={reportButtonStyle}
              onClick={generateReport}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a75ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3a86ff'}
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
                    <td style={{ ...tdStyle, fontWeight: '500' }}>${issue.maintenance_cost}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={noResultsStyle}>
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

export default MaintenanceRevenue;