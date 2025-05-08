import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faWallet, faBell, faFilePdf, faEnvelope, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const FinancialDashboard = () => {
  const navigate = useNavigate();

  // Salary Data State
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);

  // Notification State
  const [notificationCount, setNotificationCount] = useState(3);

  // Fetch salary data
  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8070/esalarys/displaySalary');
      setSalaries(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching salaries:', err);
      setError('Failed to fetch salary records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // Filter salaries based on search term
  const filteredSalaries = salaries.filter(salary =>
    salary.employeename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.employeeID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate financial metrics
  const totalIncome = salaries.reduce((sum, salary) => sum + (salary.basicSalary || 0), 0);
  const expenses = salaries.reduce((sum, salary) => sum + (salary.basicSalary || 0), 0); // Changed to sum of all salaries
  const profit = totalIncome - expenses;

  // Generate line chart data based on current financial metrics
  const generateLineChartData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Calculate daily values based on current metrics
    return days.map((day, index) => {
      const progress = (index + 1) / days.length;
      return {
        day,
        income: Math.round(totalIncome * progress * (0.9 + Math.random() * 0.2)),
        expenses: Math.round(expenses * progress * (0.9 + Math.random() * 0.2)),
        profit: Math.round(profit * progress * (0.9 + Math.random() * 0.2))
      };
    });
  };

  const dynamicLineData = generateLineChartData();

  // Pie Chart Data
  const [pieChartData, setPieChartData] = useState({
    labels: ['Total Income', 'Expenses', 'Profit'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Green for income
          'rgba(255, 99, 132, 0.6)',  // Pink for expenses
          'rgba(54, 162, 235, 0.6)'   // Blue for profit
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  });

  // Line Chart Data
  const [lineChartData, setLineChartData] = useState({
    labels: dynamicLineData.map(data => data.day),
    datasets: [
      {
        label: 'Income',
        data: dynamicLineData.map(data => data.income),
        borderColor: 'rgba(75, 192, 192, 1)', // Green
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: dynamicLineData.map(data => data.expenses),
        borderColor: 'rgba(255, 99, 132, 1)', // Pink
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Profit',
        data: dynamicLineData.map(data => data.profit),
        borderColor: 'rgba(54, 162, 235, 1)', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

  // Chart options
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += 'Rs ' + context.raw.toLocaleString('en-IN');
            return label;
          }
        }
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Financial Performance',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += 'Rs ' + context.raw.toLocaleString('en-IN');
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'Rs ' + value.toLocaleString('en-IN');
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Update chart data when financial metrics change
  useEffect(() => {
    const newLineData = generateLineChartData();
    
    setPieChartData(prev => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [totalIncome, expenses, profit],
        },
      ],
    }));

    setLineChartData(prev => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: newLineData.map(data => data.income),
        },
        {
          ...prev.datasets[1],
          data: newLineData.map(data => data.expenses),
        },
        {
          ...prev.datasets[2],
          data: newLineData.map(data => data.profit),
        },
      ],
    }));
  }, [totalIncome, expenses, profit]);

  // Salary CRUD Operations
  const handleUpdateClick = (salary) => {
    setSelectedSalary(salary);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    setSuccess('Salary record updated successfully!');
    fetchSalaries();
    setShowUpdateModal(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (salaryId) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await axios.delete(`http://localhost:8070/esalarys/delete/${salaryId}`);
        setSuccess('Salary record deleted successfully!');
        fetchSalaries();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete salary record. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  // Navigate to Employee Salary page
  const handleAddNew = () => {
    navigate('/EmployeeSalary');
  };

  // WhatsApp share function
  const handleWhatsAppShare = (salary) => {
    const message = `Salary Details for ${salary.employeename}:
Employee ID: ${salary.employeeID}
Account Number: ${salary.accountNumber}
Salary: Rs ${salary.basicSalary?.toFixed(2) || '0.00'}
Date: ${salary.date ? new Date(salary.date).toLocaleDateString() : 'N/A'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  // PDF Report Generation
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('Financial Dashboard Report', 105, 20, { align: 'center' });

    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });

    // Summary
    doc.setFontSize(14);
    doc.text('Financial Summary', 14, 45);

    // Data
    doc.setFontSize(12);
    doc.text(`Total Income: Rs ${totalIncome.toFixed(2)}`, 14, 55);
    doc.text(`Expenses: Rs ${expenses.toFixed(2)}`, 14, 65);
    doc.text(`Profit: Rs ${profit.toFixed(2)}`, 14, 75);

    // Chart placeholder note
    doc.setFontSize(10);
    doc.text('Note: The charts visualization are available in the web interface', 14, 85);

    // Table Header
    doc.setFontSize(14);
    doc.text('Employee Salary Details', 14, 105);

    // Table Data
    let yPosition = 115;
    doc.setFontSize(10);
    filteredSalaries.slice(0, 20).forEach((salary, index) => {
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${index + 1}. ${salary.employeename} (${salary.employeeID})`, 14, yPosition);
      doc.text(`Rs ${salary.basicSalary?.toFixed(2) || '0.00'}`, 150, yPosition);
      yPosition += 7;
    });

    // Save PDF
    doc.save('financial_dashboard_report.pdf');
  };

  // Notification Handler
  const handleNotificationClick = () => {
    navigate('/Notifications');
    setNotificationCount(0);
  };

  // Quick Navigation Buttons
  const quickNavButtons = [
    { text: 'Employee Salaries', path: '/EmployeeSalary' },
    { text: 'Order Details', path: '/ViewOrderDetails' },
    { text: 'Maintenance', path: '/MaintenanceRevenue' }
  ];

  // Update Salary Modal Component
  const UpdateSalaryModal = ({ salary, onClose, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
      employeename: '',
      employeeID: '',
      accountNumber: '',
      basicSalary: '',
      otHours: '',
      date: ''
    });
    const [modalError, setModalError] = useState('');
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
      if (salary) {
        setFormData({
          employeename: salary.employeename || '',
          employeeID: salary.employeeID || '',
          accountNumber: salary.accountNumber || '',
          basicSalary: salary.basicSalary || '',
          otHours: salary.otHours || '',
          date: salary.date ? salary.date.split('T')[0] : ''
        });
      }
    }, [salary]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setModalLoading(true);
      setModalError('');

      try {
        const response = await axios.put(
          `http://localhost:8070/esalarys/update/${salary._id}`,
          formData
        );
        
        if (response.status === 200) {
          onUpdateSuccess();
        }
      } catch (err) {
        console.error('Error updating salary:', err);
        setModalError(err.response?.data?.message || 'Failed to update salary record');
      } finally {
        setModalLoading(false);
      }
    };

    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.header}>
            <h2>Update Salary Record</h2>
            <button onClick={onClose} style={modalStyles.closeButton}>
              &times;
            </button>
          </div>
          
          {modalError && (
            <div style={modalStyles.error}>
              {modalError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={modalStyles.form}>
            <div style={modalStyles.formGroup}>
              <label>Employee Name:</label>
              <input
                type="text"
                name="employeename"
                value={formData.employeename}
                onChange={handleChange}
                required
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Employee ID:</label>
              <input
                type="text"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleChange}
                required
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Salary ($):</label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>OT Hours:</label>
              <input
                type="number"
                name="otHours"
                value={formData.otHours}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div style={modalStyles.footer}>
              <button
                type="button"
                onClick={onClose}
                style={modalStyles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={modalLoading}
                style={modalStyles.submitButton}
              >
                {modalLoading ? 'Updating...' : 'Update Salary'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{
          padding: '30px',
          borderRadius: '10px',
          background: 'white',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            margin: '0 auto 20px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}></div>
          Loading financial dashboard...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f8f9fa'
    }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(180deg, #4b6cb7 0%, #182848 100%)',
        color: 'white',
        padding: '20px',
        position: 'fixed',
        height: '100vh',
        boxShadow: '2px 0 20px rgba(0,0,0,0.1)',
        zIndex: 100
      }}>
        <div 
          style={{
            textAlign: 'center',
            padding: '20px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            ':hover': {
              transform: 'scale(1.05)'
            }
          }}
          onClick={handleNotificationClick}
        >
          <h1 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: '600',
            background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Financial</h1>
          <h2 style={{ 
            margin: '5px 0 0', 
            fontSize: '18px', 
            fontWeight: '400',
            opacity: 0.8
          }}>Dashboard</h2> 
        </div>

        <nav style={{ marginTop: '30px' }}>
          {[
            { icon: faUsers, text: 'Dashboard', active: true },
            { 
              icon: faBell, 
              text: 'Notifications', 
              onClick: handleNotificationClick,
              badge: notificationCount > 0 ? notificationCount : null
            },
            { icon: faWallet, text: 'Analytics' }
          ].map((item, index) => (
            <div
              key={index}
              onClick={item.onClick || (() => {})}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 15px',
                margin: '8px 0',
                borderRadius: '5px',
                backgroundColor: item.active ? 'rgba(255,255,255,0.15)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(5px)'
                }
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={{ marginRight: '10px' }} />
              <span>{item.text}</span>
              
              {item.badge && (
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{
        marginLeft: '250px',
        padding: '30px',
        flex: 1,
        maxWidth: 'calc(100% - 250px)',
        background: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)'
      }}>
        {/* Header with Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#2c3e50',
            margin: 0,
            textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
          }}>
            Financial Dashboard
            <span style={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#7f8c8d',
              marginLeft: '10px'
            }}>Overview & Analytics</span>
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Notification Button */}
            <button
              onClick={handleNotificationClick}
              style={{
                padding: '12px',
                backgroundColor: 'white',
                color: '#2c3e50',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ':hover': {
                  backgroundColor: '#f1f1f1',
                  transform: 'rotate(10deg)'
                }
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
              {notificationCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  {notificationCount}
                </span>
              )}
            </button>
            
            {/* PDF Report Button */}
            <button
              onClick={generatePDF}
              style={{
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(231, 76, 60, 0.4)'
                }
              }}
            >
              <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '8px' }} />
              Generate Report
            </button>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
          animation: 'fadeIn 0.6s ease-out 0.1s both',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          {/* Total Income Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            borderLeft: '5px solid #2ecc71',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 15px 30px rgba(46, 204, 113, 0.2)'
            }
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#7f8c8d',
                  margin: '0 0 10px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Total Income</h3>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#2ecc71', // Green color
                  margin: '5px 0',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
                }}>
                  Rs {totalIncome.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2ecc71',
                fontSize: '20px'
              }}>
                <FontAwesomeIcon icon={faWallet} />
              </div>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#95a5a6',
              margin: '15px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#2ecc71' // Green color
              }}></span>
              From all employee salaries
            </p>
          </div>

          {/* Expenses Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            borderLeft: '5px solid #e74c3c',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 15px 30px rgba(231, 76, 60, 0.2)'
            }
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#7f8c8d',
                  margin: '0 0 10px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Total Expenses</h3>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#e74c3c', // Red color
                  margin: '5px 0',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
                }}>
                  Rs {expenses.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e74c3c',
                fontSize: '20px'
              }}>
                <FontAwesomeIcon icon={faWallet} />
              </div>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#95a5a6',
              margin: '15px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#e74c3c' // Red color
              }}></span>
              Total salary expenses
            </p>
          </div>

          {/* Profit Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            borderLeft: '5px solid #3498db',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 15px 30px rgba(52, 152, 219, 0.2)'
            }
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#7f8c8d',
                  margin: '0 0 10px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Profit</h3>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#3498db', // Blue color
                  margin: '5px 0',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
                }}>
                  Rs {profit.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3498db',
                fontSize: '20px'
              }}>
                <FontAwesomeIcon icon={faWallet} />
              </div>
            </div>
            <p style={{
              fontSize: '14px',
              color: '#95a5a6',
              margin: '15px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#3498db' // Blue color
              }}></span>
              Income minus expenses
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
          animation: 'fadeIn 0.7s ease-out 0.2s both'
        }}>
          {/* Pie Chart Container */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            transition: 'all 0.3s',
            ':hover': {
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2c3e50',
              margin: '0 0 15px 0',
              textAlign: 'center'
            }}>Financial Distribution</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>

          {/* Line Chart Container */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            transition: 'all 0.3s',
            ':hover': {
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }
          }}>
            <div style={{ width: '100%', height: '300px' }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>
        </div>

        {/* Quick Navigation Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px',
          animation: 'fadeIn 0.8s ease-out 0.3s both'
        }}>
          {quickNavButtons.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 4px 10px rgba(52, 152, 219, 0.3)',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 15px rgba(52, 152, 219, 0.4)'
                }
              }}
            >
              {item.text}
            </button>
          ))}
        </div>

        {/* Salary Table Section */}
        <div style={{ 
          marginBottom: '30px',
          animation: 'fadeIn 0.9s ease-out 0.4s both'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {/* Search Input */}
            <div style={{ 
              flex: '1', 
              minWidth: '250px',
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Search employees..."
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 40px',
                  border: '1px solid #ddd',
                  borderRadius: '30px',
                  fontSize: '16px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s',
                  ':focus': {
                    outline: 'none',
                    borderColor: '#3498db',
                    boxShadow: '0 2px 15px rgba(52, 152, 219, 0.2)'
                  }
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon 
                icon={faUsers} 
                style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#95a5a6'
                }} 
              />
            </div>
            
            {/* Add New Button */}
            <button
              onClick={handleAddNew}
              style={{
                padding: '12px 25px',
                background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(46, 204, 113, 0.4)'
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add New Salary
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div style={{
              color: 'white',
              padding: '15px',
              marginBottom: '20px',
              borderRadius: '8px',
              backgroundColor: '#e74c3c',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'shake 0.5s ease-in-out',
              '@keyframes shake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
              }
            }}>
              <FontAwesomeIcon icon={faBell} />
              {error}
            </div>
          )}
          
          {success && (
            <div style={{
              color: 'white',
              padding: '15px',
              marginBottom: '20px',
              borderRadius: '8px',
              backgroundColor: '#2ecc71',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.5s ease-out',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}>
              <FontAwesomeIcon icon={faBell} />
              {success}
            </div>
          )}

          {/* Salary Table */}
          <div style={{ 
            overflowX: 'auto',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ 
                  background: 'linear-gradient(135deg, #0a8700 0%, #087500 100%)', 
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>#</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Employee Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Employee ID</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Account Number</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Salary</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '15px', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.length > 0 ? (
                  filteredSalaries.map((salary, index) => (
                    <tr 
                      key={salary._id} 
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                        transition: 'all 0.3s',
                        ':hover': {
                          backgroundColor: '#f0f7ff'
                        }
                      }}
                    >
                      <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{index + 1}</td>
                      <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{salary.employeename}</td>
                      <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{salary.employeeID}</td>
                      <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{salary.accountNumber}</td>
                      <td style={{ padding: '15px', borderBottom: '1px solid #eee', fontWeight: '600' }}>
                        Rs {salary.basicSalary?.toFixed(2) || '0.00'}
                      </td>
                      <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                        {salary.date ? new Date(salary.date).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ 
                        padding: '15px', 
                        borderBottom: '1px solid #eee', 
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        <button
                          onClick={() => handleUpdateClick(salary)}
                          style={{
                            padding: '8px 15px',
                            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 5px rgba(52, 152, 219, 0.2)',
                            ':hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(52, 152, 219, 0.3)'
                            }
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(salary._id)}
                          style={{
                            padding: '8px 15px',
                            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 5px rgba(231, 76, 60, 0.2)',
                            ':hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(231, 76, 60, 0.3)'
                            }
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleWhatsAppShare(salary)}
                          style={{
                            padding: '8px 15px',
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 5px rgba(37, 211, 102, 0.2)',
                            ':hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 8px rgba(37, 211, 102, 0.3)'
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faShare} />
                          Share
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ 
                      padding: '30px', 
                      textAlign: 'center',
                      backgroundColor: 'white',
                      fontStyle: 'italic',
                      color: '#7f8c8d'
                    }}>
                      {searchTerm ? 'No matching records found' : 'No salary records available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Salary Modal */}
        {showUpdateModal && (
          <UpdateSalaryModal
            salary={selectedSalary}
            onClose={() => setShowUpdateModal(false)}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
};

// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
    animation: 'fadeIn 0.3s ease-out',
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    }
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    width: '500px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    transform: 'scale(0.95)',
    animation: 'scaleIn 0.3s ease-out forwards',
    '@keyframes scaleIn': {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 }
    }
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    color: 'white'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'white',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'rotate(90deg)'
    }
  },
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#2c3e50'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'all 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)'
    }
  },
  error: {
    color: 'white',
    padding: '15px',
    backgroundColor: '#e74c3c',
    margin: '0 0 20px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px'
  },
  cancelButton: {
    padding: '12px 20px',
    backgroundColor: '#f5f5f5',
    color: '#2c3e50',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#e5e5e5'
    }
  },
  submitButton: {
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  }
};

export default FinancialDashboard;