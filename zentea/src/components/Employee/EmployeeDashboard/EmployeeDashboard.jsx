import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('attendance'); // State for toggling between tabs
    const [tasks, setTasks] = useState([]); // State for managing tasks
    const [progressAnimation, setProgressAnimation] = useState(false); // State for progress bar animation
    const [editingTask, setEditingTask] = useState(null); // State for tracking the task being edited

    // Trigger progress bar animation on component mount
    useEffect(() => {
        setProgressAnimation(true);
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    // Fetch tasks from the backend
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

    // Function to toggle between Attendance and Tasks tabs
    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    // Function to handle task form submission
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
            taskID: formData.get('task-id'),
            title: formData.get('title'),
            description: formData.get('description'),
            employeeName: formData.get('employee'),
            department: formData.get('department'),
            date: formData.get('date'),
            timePeriodHours: formData.get('time-period'),
            status: formData.get('status'),
        };

        try {
            let response;
            if (editingTask) {
                // Update existing task
                response = await fetch(`http://localhost:8070/task/update/${editingTask._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask),
                });
                setEditingTask(null); // Reset editing state
            } else {
                // Create new task
                response = await fetch('http://localhost:8070/task/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask),
                });
            }

            if (!response.ok) throw new Error(editingTask ? 'Failed to update task' : 'Failed to add task');
            fetchTasks(); // Refresh the task list
            e.target.reset(); // Reset the form
        } catch (error) {
            console.error(editingTask ? 'Error updating task:' : 'Error adding task:', error);
        }
    };

    // Function to delete a task
    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:8070/task/delete/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Function to edit a task
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
    };

    // Function to calculate OT time
    const calculateOTTime = (inTime, outTime) => {
        const standardInTime = new Date().setHours(8, 0, 0); // 8:00 AM
        const standardOutTime = new Date().setHours(17, 0, 0); // 5:00 PM
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

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className="IT22090508-EmployeeMnagerDashboard-sidebar">
                <div className="IT22090508-EmployeeMnagerDashboard-logo">
                    <i className="fas fa-cogs"></i>
                    <h1>Employee</h1>
                    <h2>Dashboard</h2>
                </div>
                <nav>
                    <a href="#" className="IT22090508-EmployeeMnagerDashboard-nav-link active">
                        <i className="fas fa-users"></i>
                        <span>Employee</span>
                    </a>
                    <a href="#" className="IT22090508-EmployeeMnagerDashboard-nav-link">
                        <i className="fas fa-wallet"></i>
                        <span>Notification</span>
                    </a>
                    <a
                        href="#"
                        className="IT22090508-EmployeeMnagerDashboard-nav-link"
                        onClick={() => navigate('/EmployeeDetailsTable')}
                    >
                        <i className="fas fa-truck"></i>
                        <span>Employee details</span>
                    </a>
                    <a href="#" className="IT22090508-EmployeeMnagerDashboard-nav-link">
                        <i className="fas fa-boxes"></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" className="IT22090508-EmployeeMnagerDashboard-nav-link">
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
                                        <th>OT Time</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John</td>
                                        <td>EMP-1001</td>
                                        <td>2023-10-05</td>
                                        <td>07:30 AM</td>
                                        <td>08:00 PM</td>
                                        <td>{calculateOTTime('07:30 AM', '06:00 PM')}</td>
                                        <td>Production</td>
                                        <td className="status present">Present</td>
                                        <td>
                                            <button className="action-btn edit">Update</button>
                                            <button className="action-btn delete">Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jane Smith</td>
                                        <td>EMP-1002</td>
                                        <td>2023-10-05</td>
                                        <td>08:00 AM</td>
                                        <td>10:00 PM</td>
                                        <td>{calculateOTTime('07:30 AM', '06:00 PM')}</td>
                                        <td>HR</td>
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
                            <h4>{editingTask ? 'Update Task' : 'Create New Task'}</h4>
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
                                    {editingTask ? 'Update Task' : 'Create Task'}
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
                                            <td>{task.taskID}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{task.employeeName}</td>
                                            <td>{task.department}</td>
                                            <td>{new Date(task.date).toLocaleDateString()}</td>
                                            <td>{task.timePeriodHours} hrs</td>
                                            <td className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                                                {task.status}
                                            </td>
                                            <td>
                                                <button
                                                    className="action-btn edit"
                                                    onClick={() => handleEdit(task)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="action-btn delete"
                                                    onClick={() => handleDelete(task._id)} // Use MongoDB's _id field
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