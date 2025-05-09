import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const MaintenanceRevenue = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {     
      try {
        const response = await axios.get('http://localhost:8070/issues');
        setIssues(response.data.issue || []);
        setFilteredIssues(response.data.issue || []);
      } catch (err) {
        console.error('Error fetching issues:', err);
        alert('Failed to connect to server. Please make sure the backend is running.');
      }
    };
    fetchIssues();
  }, []);

  useEffect(() => {
    const filtered = issues.filter(issue =>
      issue.issue_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.assign_technician && issue.assign_technician.toLowerCase().includes(searchTerm.toLowerCase())) ||
      issue.priority_level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIssues(filtered);
  }, [searchTerm, issues]);

  const handleBack = () => {
    navigate('/FinancialDashboard');
  };

  const generateReport = () => {
    const input = document.getElementById('report-table');
    html2canvas(input, { scale: 2, logging: false, useCORS: true }).then(canvas => {
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

      pdf.save('maintenance-report.pdf');
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    });
  };

  // Calculate total maintenance
  const totalMaintenance = filteredIssues.reduce((total, issue) => 
    total + Number(issue.maintenance_cost || 0), 0);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1a1a1a',
            margin: 0
          }}>Maintenance</h2>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={handleBack}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                transition: '0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5a6268'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              ← Back
            </button>
            <button
              onClick={generateReport}
              style={{
                backgroundColor: '#3a86ff',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                transition: '0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a75ff'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3a86ff'}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Income Summary */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>
            Total Maintenance 
          </h3>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#28a745',
            marginTop: '0.25rem'
          }}>
            Rs. {totalMaintenance.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search maintenance records..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#fff',
              boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Table */}
        <div id="report-table" style={{
          overflow: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Serial Number</th>
                <th style={thStyle}>Issue Title</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Priority</th>
                <th style={thStyle}>Technician</th>
                <th style={thStyle}>Cost (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue, index) => (
                  <tr
                    key={issue._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafc',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e3f2fd'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9fafc'}
                  >
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{issue.serial_number}</td>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>{issue.issue_title}</td>
                    <td style={tdStyle}>{issue.description}</td>
                    <td style={{
                      ...tdStyle,
                      color: issue.priority_level === 'High' ? '#ff6b6b' :
                             issue.priority_level === 'Medium' ? '#ffa94d' : '#38d9a9',
                      fontWeight: '600'
                    }}>
                      {issue.priority_level}
                    </td>
                    <td style={tdStyle}>{issue.assign_technician || 'Not Assigned'}</td>
                    <td style={{ ...tdStyle, fontWeight: '600', color: '#198754' }}>
                      Rs. {Number(issue.maintenance_cost || 0).toLocaleString('en-LK', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: '#6c757d',
                    backgroundColor: '#ffffff'
                  }}>
                    {searchTerm ? 'No maintenance records match your search.' : 'No maintenance records found.'}
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

// Style for table headers and cells
const thStyle = {
  background: 'linear-gradient(90deg, #2a2f45, #3b3f5c)',
  color: '#ffffff',
  padding: '1rem',
  textAlign: 'left',
  fontWeight: '600',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '2px solid #dee2e6',
};

const tdStyle = {
  padding: '1rem',
  textAlign: 'left',
  borderBottom: '1px solid #e9ecef',
};

export default MaintenanceRevenue;