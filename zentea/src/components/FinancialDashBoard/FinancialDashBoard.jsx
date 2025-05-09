import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faWallet, faBell, faFilePdf, faEnvelope, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const FinancialDashboard = () => {
  const navigate = useNavigate();

  // State
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [maintenanceExpenses, setMaintenanceExpenses] = useState(0);
  const [orderIncome, setOrderIncome] = useState(0);

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

  // Fetch maintenance expenses
  const fetchMaintenanceExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8070/issues');
      const issues = response.data.issue || [];
      const totalMaintenance = issues.reduce((sum, issue) => sum + (Number(issue.maintenance_cost) || 0), 0);
      setMaintenanceExpenses(totalMaintenance);
    } catch (err) {
      console.error('Error fetching maintenance expenses:', err);
    }
  };

  // Get order income from localStorage
  const fetchOrderIncome = () => {
    const income = localStorage.getItem('orderTotalIncome') || 0;
    setOrderIncome(Number(income));
  };

  useEffect(() => {
    fetchSalaries();
    fetchMaintenanceExpenses();
    fetchOrderIncome();
    
    // Set up listener for storage events to update in real-time
    const handleStorageChange = () => {
      fetchOrderIncome();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Filter salaries based on search term
  const filteredSalaries = salaries.filter(salary =>
    salary.employeename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.employeeID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total salaries from the filtered list
  const totalSalaries = filteredSalaries.reduce((sum, salary) => sum + (Number(salary.basicSalary) || 0), 0);

  // Calculate financial metrics
  const totalIncome = orderIncome;
  const expenses = maintenanceExpenses + totalSalaries; // Include salaries in expenses
  const profit = totalIncome - expenses;

  // Generate monthly bar chart data - updated to show only current month
  const generateMonthlyBarChartData = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
    
    return [{
      month: currentMonth,
      income: totalIncome,
      expenses: expenses,
      profit: profit
    }];
  };

  const monthlyBarData = generateMonthlyBarChartData();

  // Pie Chart Data
  const pieChartData = {
    labels: ['Income', 'Expenses', 'Profit'],
    datasets: [
      {
        data: [totalIncome, expenses, profit],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Monthly Performance Bar Chart Data
  const monthlyPerformanceBarData = {
    labels: monthlyBarData.map(data => data.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyBarData.map(data => data.income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: monthlyBarData.map(data => data.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit',
        data: monthlyBarData.map(data => data.profit),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

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

  const monthlyBarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Financial Performance',
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
            animation: 'spin 1s linear infinite'
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
      {/* Sidebar Navigation with updated gradient color */}
      <div style={{
        width: '250px',
        background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
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
            cursor: 'pointer'
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
            }
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
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#2c3e50',
            margin: 0
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
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
                  fontSize: '12px'
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
                fontWeight: '600'
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
          marginBottom: '30px'
        }}>
          {/* Total Income Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            borderLeft: '5px solid #2ecc71'
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
                  textTransform: 'uppercase'
                }}>Total Income</h3>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#2ecc71',
                  margin: '5px 0'
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
          </div>

          {/* Expenses Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            borderLeft: '5px solid #e74c3c'
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
                  textTransform: 'uppercase'
                }}>Total Expenses</h3>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#e74c3c',
                  margin: '5px 0'
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
          </div>

          {/* Profit Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            borderLeft: '5px solid #3498db'
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
                  textTransform: 'uppercase'
                }}>Profit</h3>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#3498db',
                  margin: '5px 0'
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
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Pie Chart Container */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
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

          {/* Monthly Performance Bar Chart Container - Now shows only current month */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2c3e50',
              margin: '0 0 15px 0',
              textAlign: 'center'
            }}>Current Month Financial Performance</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <Bar data={monthlyPerformanceBarData} options={monthlyBarOptions} />
            </div>
          </div>
        </div>

        {/* Quick Navigation Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              {item.text}
            </button>
          ))}
        </div>

        {/* Salary Table Section */}
        <div style={{ 
          marginBottom: '30px'
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
                  fontSize: '16px'
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
                gap: '10px'
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
              gap: '10px'
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
              gap: '10px'
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
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ 
                  background: 'linear-gradient(135deg, #0a8700 0%, #087500 100%)', 
                  color: 'white',
                  textTransform: 'uppercase'
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
                  <>
                    {filteredSalaries.map((salary, index) => (
                      <tr 
                        key={salary._id} 
                        style={{ 
                          backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
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
                          textAlign: 'center'
                        }}>
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
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                          >
                            <FontAwesomeIcon icon={faShare} />
                            Share
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Total Salary Row */}
                    <tr style={{ 
                      backgroundColor: '#f8f9fa',
                      fontWeight: 'bold',
                      borderTop: '2px solid #ddd'
                    }}>
                      <td style={{ padding: '15px' }} colSpan="3"></td>
                      <td style={{ padding: '15px', textAlign: 'left' }}>Total Salaries:</td>
                      <td style={{ padding: '15px', fontWeight: '600' }}>
                        Rs {totalSalaries.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td style={{ padding: '15px' }} colSpan="2"></td>
                    </tr>
                  </>
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
      </div>
    </div>
  );
};

export default FinancialDashboard;