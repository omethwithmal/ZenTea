import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


const EmployeeDashboard = () => {

    const navigate = useNavigate();



    const [activeTab, setActiveTab] = useState('attendance'); // State for toggling between tabs
    const [tasks, setTasks] = useState([]); // State for managing tasks
    const [progressAnimation, setProgressAnimation] = useState(false); // State for progress bar animation

    // Trigger progress bar animation on component mount
    useEffect(() => {
        setProgressAnimation(true);
    }, []);

    // Function to toggle between Attendance and Tasks tabs
    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    // Function to handle task form submission
    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
            taskId: formData.get('task-id'),
            title: formData.get('title'),
            description: formData.get('description'),
            employee: formData.get('employee'),
            department: formData.get('department'),
            date: formData.get('date'),
            timePeriod: formData.get('time-period'),
            status: formData.get('status'),
        };
        setTasks([...tasks, newTask]); // Add the new task to the tasks array
        e.target.reset(); // Reset the form
    };

    // Function to delete a task or attendance record
    const handleDelete = (index, type) => {
        if (type === 'task') {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="IT22090508-managersdashbord-sidebar">
                <div className="IT22090508-managersdashbord-logo">
                    <i className="fas fa-cogs"></i>
                    <h1>Employee</h1>
                    <h2>Dashboard</h2>
                </div>
                {/* Navigation Links */}
                <nav>
                    
                    <a href="#" className="IT22090508-managersdashbord-nav-link active">
                        <i className="fas fa-users"></i>
                        <span>Employee</span>
                    </a>
                    <a href="#" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-wallet"></i>
                        <span>Notification</span>
                    </a>
                    <a href="#" className="IT22090508-managersdashbord-nav-link"
                    onClick={() =>navigate('/EmployeeDetailsTable')}
                    >
                        <i className="fas fa-truck"></i>
                        <span>Employee details</span>
                    </a>
                    <a href="#" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-boxes"></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-tools"></i>
                        <span>Log Out</span>
                    </a>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="content">
                <header className="top-bar">
                    <div className="button-group">
                        <button
                            onClick={() => showTab('attendance')}
                            className={activeTab === 'attendance' ? 'btn active' : 'btn'}
                        >
                            Attendance
                        </button>
                        <button
                            onClick={() => showTab('tasks')}
                            className={activeTab === 'tasks' ? 'btn active' : 'btn'}
                        >
                            Tasks
                        </button>
                    </div>
                    {/* Attendance Search */}
                    {activeTab === 'attendance' && (
                        <div className="search-container attendance-search">
                            <div className="search-box">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Search attendance records..." />
                            </div>
                            <button className="download-btn">
                                <i className="fas fa-download"></i> Download Report
                            </button>
                        </div>
                    )}
                    {/* Task Search */}
                    {activeTab === 'tasks' && (
                        <div className="search-container task-search">
                            <div className="search-box">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Search tasks..." />
                            </div>
                            <button className="download-btn">
                                <i className="fas fa-download"></i> Download Report
                            </button>
                        </div>
                    )}
                </header>
                {/* Attendance Dashboard */}
                {activeTab === 'attendance' && (
                    <div id="attendance" className="management-dashboard active">
                        <div className="attendance-header">
                            <h3>Attendance Records</h3>
                            <div className="date-filter">
                                <i className="fas fa-calendar-alt"></i>
                                <input type="month" className="date-picker" />
                            </div>
                        </div>
                        {/* Attendance Widgets */}
                        <div className="widgets">
                            <div className="widget present-percentage">
                                <h4>Present Employees</h4>
                                <p>75%</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: progressAnimation ? '75%' : '0%',
                                            transition: 'width 1s ease-in-out',
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="widget absent-percentage">
                                <h4>Absent Employees</h4>
                                <p>25%</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: progressAnimation ? '25%' : '0%',
                                            transition: 'width 1s ease-in-out',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="attendance-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>EMP-1001</td>
                                        <td>2023-10-05</td>
                                        <td>08:58 AM</td>
                                        <td>05:02 PM</td>
                                        <td>Production</td>
                                        <td className="status present">Present</td>
                                        <td>
                                            <button className="action-btn edit">Update</button>
                                            <button className="action-btn delete">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* Task Dashboard */}
                {activeTab === 'tasks' && (
                    <div id="tasks" className="management-dashboard">
                        <div className="task-header">
                            <h3>Task Management</h3>
                        </div>
                        {/* Task Widgets */}
                        <div className="widgets">
                            <div className="widget progress-task">
                                <h4>In Progress Tasks</h4>
                                <div className="circular-progress">
                                    <svg className="progress-circle" viewBox="0 0 36 36">
                                        <path
                                            className="circle-bg"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="circle"
                                            strokeDasharray="50, 100"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <p>50%</p>
                                </div>
                            </div>
                            <div className="widget completed-task">
                                <h4>Completed Tasks</h4>
                                <div className="circular-progress">
                                    <svg className="progress-circle" viewBox="0 0 36 36">
                                        <path
                                            className="circle-bg"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="circle"
                                            strokeDasharray="30, 100"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <p>30%</p>
                                </div>
                            </div>
                            <div className="widget pending-task">
                                <h4>Pending Tasks</h4>
                                <div className="circular-progress">
                                    <svg className="progress-circle" viewBox="0 0 36 36">
                                        <path
                                            className="circle-bg"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="circle"
                                            strokeDasharray="20, 100"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <p>20%</p>
                                </div>
                            </div>
                        </div>
                        <div className="task-form">
                            <h4>Create New Task</h4>
                            <form id="taskForm" onSubmit={handleTaskSubmit}>
                                <div className="form-grid">
                                    <input type="text" placeholder="Task ID" name="task-id" required />
                                    <input type="text" placeholder="Title" name="title" required />
                                    <textarea placeholder="Description" name="description"></textarea>
                                    <input type="text" placeholder="Employee Name" name="employee" required />
                                    <select name="department" required>
                                        <option value="">Select Department</option>
                                        <option>Production</option>
                                        <option>HR</option>
                                        <option>Finance</option>
                                        <option>Inventory</option>
                                        <option>Maintenance</option>
                                    </select>
                                    <input type="date" name="date" required />
                                    <input type="text" placeholder="Time Period (e.g., 2hrs)" name="time-period" required />
                                    <select className="status-select" name="status" required>
                                        <option value="">Status</option>
                                        <option>In Progress</option>
                                        <option>Completed</option>
                                        <option>Pending</option>
                                    </select>
                                </div>
                                <button type="submit" className="submit-btn">
                                    Create Task
                                </button>
                            </form>
                        </div>
                        <div className="task-table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>T ID</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Employee</th>
                                        <th>Department</th>
                                        <th>Date</th>
                                        <th>Time Period</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task, index) => (
                                        <tr key={index}>
                                            <td>{task.taskId}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.employee}</td>
                                            <td>{task.department}</td>
                                            <td>{task.date}</td>
                                            <td>{task.timePeriod}</td>
                                            <td className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                                                {task.status}
                                            </td>
                                            <td>
                                                <button className="action-btn edit">Update</button>
                                                <button
                                                    className="action-btn delete"
                                                    onClick={() => handleDelete(index, 'task')}
                                                >
                                                    Delete
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