import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('attendance');
    const [tasks, setTasks] = useState([]);
    const [progressAnimation, setProgressAnimation] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [errors, setErrors] = useState({});
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [currentSharedTask, setCurrentSharedTask] = useState(null);

    useEffect(() => {
        setProgressAnimation(true);
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8070/task/display');
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskID = formData.get('task-id').trim();
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const employeeName = formData.get('employee').trim();
        const department = formData.get('department').trim();
        const date = formData.get('date').trim();
        const timePeriodHours = formData.get('time-period').trim();
        const status = formData.get('status').trim();

        setErrors({});

        const taskIdRegex = /^[0-9]+$/;
        const titleRegex = /^[A-Za-z\s]+$/;
        const employeeNameRegex = /^[A-Za-z\s]+$/;
        const timePeriodRegex = /^[0-9]+(\.[0-9]+)?$/;

        const newErrors = {};

        if (!taskIdRegex.test(taskID)) newErrors['task-id'] = 'Task ID must contain only numbers.';
        if (!titleRegex.test(title)) newErrors['title'] = 'Title must contain only letters.';
        if (!employeeNameRegex.test(employeeName)) newErrors['employee'] = 'Employee Name must contain only words.';
        if (!department) newErrors['department'] = 'Please select a department.';
        if (!date) newErrors['date'] = 'Please select a valid date.';
        if (!timePeriodRegex.test(timePeriodHours)) newErrors['time-period'] = 'Time Period must be a positive number.';
        if (!status) newErrors['status'] = 'Please select a status.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newTask = {
            taskID,
            title,
            description,
            employeeName,
            department,
            date,
            timePeriodHours,
            status,
        };

        try {
            let response;
            if (editingTask) {
                response = await fetch(`http://localhost:8070/task/update/${editingTask._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask),
                });
                setEditingTask(null);
            } else {
                response = await fetch('http://localhost:8070/task/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask),
                });
            }

            if (!response.ok) throw new Error(editingTask ? 'Failed to update task' : 'Failed to add task');

            fetchTasks();
            e.target.reset();
            setErrors({});
        } catch (error) {
            console.error(editingTask ? 'Error updating task:' : 'Error adding task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:8070/task/delete/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        const form = document.getElementById('taskForm');
        form['task-id'].value = task.taskID;
        form['title'].value = task.title;
        form['description'].value = task.description;
        form['employee'].value = task.employeeName;
        form['department'].value = task.department;
        form['date'].value = new Date(task.date).toISOString().split('T')[0];
        form['time-period'].value = task.timePeriodHours;
        form['status'].value = task.status;
        setErrors({});
    };

    const openShareModal = (task) => {
        setCurrentSharedTask(task);
        setShareModalOpen(true);
    };

    const closeShareModal = () => {
        setShareModalOpen(false);
        setCurrentSharedTask(null);
    };

    const shareOnWhatsApp = () => {
        if (!currentSharedTask) return;
        
        const message = `Task Details:\n\n` +
                       `*Title:* ${currentSharedTask.title}\n` +
                       `*Description:* ${currentSharedTask.description}\n` +
                       `*Assigned To:* ${currentSharedTask.employeeName}\n` +
                       `*Department:* ${currentSharedTask.department}\n` +
                       `*Due Date:* ${new Date(currentSharedTask.date).toLocaleDateString()}\n` +
                       `*Time Period:* ${currentSharedTask.timePeriodHours} hrs\n` +
                       `*Status:* ${currentSharedTask.status}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    };

    const calculateOTTime = (inTime, outTime) => {
        const standardInTime = new Date().setHours(8, 0, 0);
        const standardOutTime = new Date().setHours(17, 0, 0);
        const inTimeDate = new Date(`2023-01-01T${inTime}`);
        const outTimeDate = new Date(`2023-01-01T${outTime}`);
        let otTime = '';
        if (inTimeDate < standardInTime) {
            const diffMs = standardInTime - inTimeDate;
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            otTime += `${diffHours}h ${diffMinutes}m early`;
        }
        if (outTimeDate > standardOutTime) {
            const diffMs = outTimeDate - standardOutTime;
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            otTime += otTime ? ', ' : '';
            otTime += `${diffHours}h ${diffMinutes}m late`;
        }
        return otTime || 'No OT';
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateCSV = () => {
        if (tasks.length === 0) {
            alert('No tasks to generate a report.');
            return;
        }
        let csvContent = 'Task ID,Title,Description,Employee,Department,Date,Time Period,Status\n';
        tasks.forEach((task) => {
            csvContent += `"${task.taskID}","${task.title.replace(/"/g, '""')}","${task.description.replace(/"/g, '""')}","${task.employeeName}","${task.department}","${new Date(task.date).toLocaleDateString()}","${task.timePeriodHours} hrs","${task.status}"\n`;
        });
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'task-report.csv';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const calculateTaskCounts = () => {
        const totalTasks = tasks.length;
        const inProgressCount = tasks.filter((task) => task.status === 'In Progress').length;
        const completedCount = tasks.filter((task) => task.status === 'Completed').length;
        const pendingCount = tasks.filter((task) => task.status === 'Pending').length;
        const inProgressPercentage = totalTasks > 0 ? Math.round((inProgressCount / totalTasks) * 100) : 0;
        const completedPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
        const pendingPercentage = totalTasks > 0 ? Math.round((pendingCount / totalTasks) * 100) : 0;
        return {
            inProgressCount,
            completedCount,
            pendingCount,
            inProgressPercentage,
            completedPercentage,
            pendingPercentage,
        };
    };

    const { inProgressCount, completedCount, pendingCount, inProgressPercentage, completedPercentage, pendingPercentage } =
        calculateTaskCounts();

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Share Modal */}
            {shareModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        width: '400px',
                        maxWidth: '90%',
                        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '20px',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#333' }}>Share Task</h3>
                            <button 
                                onClick={closeShareModal}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                &times;
                            </button>
                        </div>
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <p style={{ marginBottom: '20px' }}>Share this task via WhatsApp</p>
                            <button
                                onClick={shareOnWhatsApp}
                                style={{
                                    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto',
                                    gap: '8px'
                                }}
                            >
                                <i className="fab fa-whatsapp" style={{ fontSize: '24px' }}></i>
                                Share on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '20px 0',
                minHeight: '100vh',
                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <i className="fas fa-cogs" style={{ fontSize: '40px', marginBottom: '10px' }}></i>
                    <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Employee</h1>
                    <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
                </div>
                <nav style={{ marginTop: '20px' }}>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                        backgroundColor: 'rgba(255, 255, 255, 0.28)'
                    }} 
                    
                    >
                        <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
                        <span>Employee Task</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}
                    onClick={() => navigate('/NotificationDashboard')}
                    >
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Notification</span>
                    </a>


                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                       
                    }}
                    onClick={() => navigate('/AttendanceRecordCard')}
                    >
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Mark Attendance</span>
                    </a>



                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                       
                    }}
                    onClick={() => navigate('/AttendanceDashboard')}
                    >
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee Attendance</span>
                    </a>

                    <a
                        href="#"
                        style={{
                            display: 'block',
                            padding: '15px 20px',
                            color: 'white',
                            textDecoration: 'none',
                            borderLeft: '4px solid transparent'
                        }}
                        onClick={() => navigate('/EmployeeDetailsCart')}
                    >
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee details</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}
                    onClick={() =>navigate('/')}
                    >
                        <i className="fas fa-tools" style={{ marginRight: '10px' }}></i>
                        <span>Log Out</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto'
            }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '10px'
                    }}>
                        <button
                            onClick={() => showTab('attendance')}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: activeTab === 'attendance' ? '#3fbb02' : '#ecf0f1',
                                color: activeTab === 'attendance' ? 'white' : '#333'
                            }}
                        >
                            Attendance
                        </button>
                        <button
                            onClick={() => showTab('tasks')}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: activeTab === 'tasks' ? '#3fbb02' : '#ecf0f1',
                                color: activeTab === 'tasks' ? 'white' : '#333'
                            }}
                        >
                            Tasks
                        </button>
                    </div>
                    {activeTab === 'attendance' && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <div style={{
                                position: 'relative'
                            }}>
                                <i className="fas fa-search" style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#7f8c8d'
                                }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Search attendance records..." 
                                    style={{
                                        padding: '10px 10px 10px 35px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        minWidth: '250px',
                                        backgroundColor:'#ffffff',
                                            color:'#000000',
                                    }}
                                />
                            </div>
                            <button style={{
                                padding: '10px 15px',
                                backgroundColor: '#2ecc71',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
                            }}>
                                <i className="fas fa-download"></i> Download Report
                            </button>
                        </div>
                    )}
                    {activeTab === 'tasks' && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                            
                        }}>
                            <div style={{
                                position: 'relative'
                            }}>
                                <i className="fas fa-search" style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                   
                                }}></i>
                                <input 
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{
                                        padding: '10px 10px 10px 35px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                        minWidth: '250px',
                                        backgroundColor:'#ffffff',
                                            color:'#000000',
                                        
                                    }}
                                />
                            </div>
                            <button 
                                onClick={generateCSV}
                                style={{
                                    padding: '10px 15px',
                                    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <i className="fas fa-download"></i> Generate CSV
                            </button>
                        </div>
                    )}
                </header>

                {/* Attendance Dashboard */}
                {activeTab === 'attendance' && (
                    <div id="attendance" style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '130px',
                        boxShadow: '0 2px 5px rgb(255, 255, 255)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h3 style={{ margin: 0 }}>Attendance Records</h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <i className="fas fa-calendar-alt" style={{ color: '#7f8c8d' }}></i>
                                <input 
                                    type="month" 
                                    style={{
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
                            }}>
                                <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Present Employees</h4>
                                <p style={{ fontSize: '24px', margin: '10px 0' }}>75%</p>
                                <div style={{
                                    height: '10px',
                                    backgroundColor: '#e9ecef',
                                    borderRadius: '5px',
                                    overflow: 'hidden'
                                }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: progressAnimation ? '75%' : '0%',
                                            backgroundColor: '#0acc00',
                                            transition: 'width 1s ease-in-out'
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
                            }}>
                                <h4 style={{ marginTop: 0, marginBottom: '10px' }}>Absent Employees</h4>
                                <p style={{ fontSize: '24px', margin: '10px 0' }}>25%</p>
                                <div style={{
                                    height: '10px',
                                    backgroundColor: '#e9ecef',
                                    borderRadius: '5px',
                                    overflow: 'hidden'
                                }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: progressAnimation ? '25%' : '0%',
                                            backgroundColor: '#da0000',
                                            transition: 'width 1s ease-in-out'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            overflowX: 'auto'
                        }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                    <tr style={{
                                        background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                                        color:'white',
                                        borderBottom: '1px solid #ddd'
                                    }}>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Name</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>ID</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Date</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>In Time</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Out Time</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>OT Time</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Department</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{
                                        borderBottom: '1px solid #eee'
                                    }}>
                                        <td style={{ padding: '12px 15px' }}>John</td>
                                        <td style={{ padding: '12px 15px' }}>EMP-1001</td>
                                        <td style={{ padding: '12px 15px' }}>2023-10-05</td>
                                        <td style={{ padding: '12px 15px' }}>07:30 AM</td>
                                        <td style={{ padding: '12px 15px' }}>08:00 PM</td>
                                        <td style={{ padding: '12px 15px' }}>{calculateOTTime('07:30 AM', '06:00 PM')}</td>
                                        <td style={{ padding: '12px 15px' }}>Production</td>
                                        <td style={{ 
                                            padding: '12px 15px',
                                            color: '#2ecc71',
                                            fontWeight: 'bold'
                                        }}>Present</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <button style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#ffffff',
                                                color: '#0600ff',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginRight: '5px'
                                            }}>Update</button>
                                            <button style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#ffffff',
                                                color: '#ff0000',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                    <tr style={{
                                        borderBottom: '1px solid #eee'
                                    }}>
                                        <td style={{ padding: '12px 15px' }}>Jane Smith</td>
                                        <td style={{ padding: '12px 15px' }}>EMP-1002</td>
                                        <td style={{ padding: '12px 15px' }}>2023-10-05</td>
                                        <td style={{ padding: '12px 15px' }}>08:00 AM</td>
                                        <td style={{ padding: '12px 15px' }}>10:00 PM</td>
                                        <td style={{ padding: '12px 15px' }}>{calculateOTTime('07:30 AM', '06:00 PM')}</td>
                                        <td style={{ padding: '12px 15px' }}>HR</td>
                                        <td style={{ 
                                            padding: '12px 15px',
                                            color: '#2ecc71',
                                            fontWeight: 'bold'
                                        }}>Present</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <button style={{
                                                padding: '5px 10px',
                                               backgroundColor: '#ffffff',
                                                color: '#0600ff',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginRight: '5px'
                                            }}>Update</button>
                                            <button style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#ffffff',
                                                color: '#ff0000',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Task Dashboard */}
                {activeTab === 'tasks' && (
                    <div id="tasks" style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                       
                        padding: '20px',
                        margin:'60px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ margin: 0 }}>Task Management</h3>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                boxShadow: ' 2px 5px rgba(72, 255, 0, 0.5)0',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ marginTop: 0, marginBottom: '15px' }}>In Progress Tasks</h4>
                                <div style={{
                                    position: 'relative',
                                    width: '120px',
                                    height: '120px',
                                    margin: '0 auto 3px'
                                }}>
                                    <svg 
                                        viewBox="0 0 36 36" 
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            marginLeft:'-60px'
                                        }}
                                    >
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#e9ecef"
                                            strokeWidth="4"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#2400dc"
                                            strokeWidth="4"
                                            strokeDasharray={`${inProgressPercentage}, 100`}
                                        />
                                    </svg>
                                    <p style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}>{inProgressPercentage}%</p>
                                </div>
                                <p style={{ margin: 0 }}>Total: {inProgressCount}</p>
                            </div>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ marginTop: 0, marginBottom: '15px' }}>Completed Tasks</h4>
                                <div style={{
                                    position: 'relative',
                                    width: '120px',
                                    height: '120px',
                                    margin: '0 auto 10px'
                                }}>
                                    <svg 
                                        viewBox="0 0 36 36" 
                                        style={{
                                            position: 'absolute',
                                            marginLeft:'-60px',
                                            width: '100%',
                                            height: '100%'
                                            
                                        }}
                                    >
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#e9ecef"
                                            strokeWidth="4"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#5fe100"
                                            strokeWidth="4"
                                            strokeDasharray={`${completedPercentage}, 100`}
                                        />
                                    </svg>
                                    <p style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}>{completedPercentage}%</p>
                                </div>
                                <p style={{ margin: 0 }}>Total: {completedCount}</p>
                            </div>
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '8px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ marginTop: 0, marginBottom: '15px' }}>Pending Tasks</h4>
                                <div style={{
                                    position: 'relative',
                                    width: '120px',
                                    height: '120px',
                                    margin: '0 auto 10px'
                                }}>
                                    <svg 
                                        viewBox="0 0 36 36" 
                                        style={{
                                            position: 'absolute',
                                            marginLeft:'-60px',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#e9ecef"
                                            strokeWidth="4"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#f39c12"
                                            strokeWidth="4"
                                            strokeDasharray={`${pendingPercentage}, 100`}
                                        />
                                    </svg>
                                    <p style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        margin: 0
                                    }}>{pendingPercentage}%</p>
                                </div>
                                <p style={{ margin: 0 }}>Total: {pendingCount}</p>
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <h4 style={{ marginTop: 0 }}>{editingTask ? 'Update Task' : 'Create New Task'}</h4>
                            <form id="taskForm" onSubmit={handleTaskSubmit} style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: '15px'
                            }}>
                                <div>
                                    <label htmlFor="task-id" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Task ID</label>
                                    <input
                                        type="text"
                                        id="task-id"
                                        name="task-id"
                                        required
                                        onInput={() => setErrors((prev) => ({ ...prev, 'task-id': '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            border: errors['task-id'] ? '1px solid #e74c3c' : '1px solid #ddd',
                                            backgroundColor:'#ffffff',
                                            color:'#000000'
                                            
                                            
                                        }}
                                    />
                                    {errors['task-id'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['task-id']}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="title" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        required
                                        onInput={() => setErrors((prev) => ({ ...prev, title: '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            backgroundColor:'#ffffff',
                                            color:'#000000',
                                            border: errors['title'] ? '1px solid #e74c3c' : '1px solid #ddd'
                                        }}
                                    />
                                    {errors['title'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['title']}</p>
                                    )}
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label htmlFor="description" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        onInput={() => setErrors((prev) => ({ ...prev, description: '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            backgroundColor:'#ffffff',
                                            color:'#000000',
                                            border: errors['description'] ? '1px solid #e74c3c' : '1px solid #ddd',
                                            resize: 'vertical'
                                        }}
                                    ></textarea>
                                    {errors['description'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['description']}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="employee" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Employee Name</label>
                                    <input
                                        type="text"
                                        id="employee"
                                        name="employee"
                                        required
                                        onInput={() => setErrors((prev) => ({ ...prev, employee: '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            backgroundColor:'#ffffff',
                                            color:'#000000',
                                            border: errors['employee'] ? '1px solid #e74c3c' : '1px solid #ddd'
                                        }}
                                    />
                                    {errors['employee'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['employee']}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="department" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Department</label>
                                    <select
                                        id="department"
                                        name="department"
                                        required
                                        onInput={() => setErrors((prev) => ({ ...prev, department: '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            backgroundColor:'#ffffff',
                                            color:'#000000',
                                            border: errors['department'] ? '1px solid #e74c3c' : '1px solid #ddd',
                                           
                                        }}
                                    >
                                        <option value="">Select Department</option>
                                        <option>Production</option>
                                        <option>HR</option>
                                        <option>Finance</option>
                                        <option>Inventory</option>
                                        <option>Maintenance</option>
                                    </select>
                                    {errors['department'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['department']}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="date" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        required
                                        onInput={() => setErrors((prev) => ({ ...prev, date: '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            backgroundColor:'#ffffff',
                                            color:'#000000',
                                            border: errors['date'] ? '1px solid #e74c3c' : '1px solid #ddd'
                                        }}
                                    />
                                    {errors['date'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['date']}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="time-period" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Time Period</label>
                                    <input
                                        type="text"
                                        id="time-period"
                                        name="time-period"
                                        placeholder="e.g., 2hrs"
                                        required
                                        onInput={() => setErrors((prev) => ({ ...prev, 'time-period': '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            backgroundColor:'#ffffff',
                                            color:'#000000',
                                            border: errors['time-period'] ? '1px solid #e74c3c' : '1px solid #ddd'
                                        }}
                                    />
                                    {errors['time-period'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['time-period']}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="status" style={{
                                        display: 'block',
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        required
                                        onInput={() => setErrors((prev) => ({ ...prev, status: '' }))}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                             backgroundColor:'#ffffff',
                                            color:'#000000',
                                            border: errors['status'] ? '1px solid #e74c3c' : '1px solid #ddd',
                                            
                                        }}
                                    >
                                        <option value="">Select Status</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>Pending</option>
                                    </select>
                                    {errors['status'] && (
                                        <p style={{ color: '#e74c3c', margin: '5px 0 0', fontSize: '14px' }}>{errors['status']}</p>
                                    )}
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <button type="submit" style={{
                                        padding: '10px 20px',
                                        background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}>
                                        {editingTask ? 'Update Task' : 'Create Task'}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div style={{
                            overflowX: 'auto'
                        }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse'
                            }}>
                                <thead>
                                    <tr style={{
                                        background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                                        color:'white',
                                        borderBottom: '1px solid #ddd'
                                    }}>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>T ID</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Title</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Description</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Employee</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Department</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Date</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Time Period</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                                        <th style={{ padding: '12px 15px', textAlign: 'left' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.map((task, index) => (
                                        <tr key={index} style={{
                                            borderBottom: '1px solid #eee'
                                        }}>
                                            <td style={{ padding: '12px 15px' }}>{task.taskID}</td>
                                            <td style={{ padding: '12px 15px' }}>{task.title}</td>
                                            <td style={{ padding: '12px 15px' }}>{task.description}</td>
                                            <td style={{ padding: '12px 15px' }}>{task.employeeName}</td>
                                            <td style={{ padding: '12px 15px' }}>{task.department}</td>
                                            <td style={{ padding: '12px 15px' }}>{new Date(task.date).toLocaleDateString()}</td>
                                            <td style={{ padding: '12px 15px' }}>{task.timePeriodHours} hrs</td>
                                            <td style={{ 
                                                padding: '12px 15px',
                                                fontWeight: 'bold',
                                                color: task.status === 'Completed' ? '#2ecc71' : 
                                                       task.status === 'In Progress' ? '#3498db' : '#f39c12'
                                            }}>
                                                {task.status}
                                            </td>
                                            <td style={{ padding: '12px 15px' }}>
                                                <button
                                                    onClick={() => handleEdit(task)}
                                                    style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: '#ffffff',
                                                        color: '#0c00ff',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        marginRight: '5px'
                                                    }}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: '#ffffff',
                                                        color: '#ff0000',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        marginRight: '5px'
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => openShareModal(task)}
                                                    style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: '#ffffff',
                                                        color: '#2aff00',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Share
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default EmployeeDashboard;