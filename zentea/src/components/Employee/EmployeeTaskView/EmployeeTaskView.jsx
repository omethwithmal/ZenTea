import React, { useState } from 'react';
import './EmployeeTaskView.css'; // Import the CSS file

const EmployeeTaskView = () => {
    const [tasks, setTasks] = useState([
        {
            taskId: 'TASK-001',
            title: 'Quality Check',
            description: 'Check production quality standards',
            employee: 'Jane Smith',
            department: 'Quality Control',
            date: '2023-10-10',
            timePeriod: '3hrs',
            status: 'In Progress',
        },
        {
            taskId: 'TASK-002',
            title: 'Inventory Audit',
            description: 'Audit inventory levels',
            employee: 'John Doe',
            department: 'Inventory',
            date: '2023-10-12',
            timePeriod: '5hrs',
            status: 'Pending',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    // Update task status (Start or Complete)
    const updateTaskStatus = (index, newStatus) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].status = newStatus;
        setTasks(updatedTasks);
    };

    // Filter tasks based on search term
    const filteredTasks = tasks.filter(
        (task) =>
            task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.employee.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="IT22090508-employeeTaskview-container">
            {/* Search Bar */}
            <div className="IT22090508-employeeTaskview-search-bar">
                <input
                    type="text"
                    placeholder="Search by T ID or Employee Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
            </div>

            {/* Task Table */}
            <table className="IT22090508-employeeTaskview-table">
                <thead>
                    <tr>
                        <th>T ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Time Period</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task, index) => (
                        <tr
                            key={index}
                            className={
                                task.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                task.employee.toLowerCase().includes(searchTerm.toLowerCase())
                                    ? 'highlight'
                                    : ''
                            }
                        >
                            <td>{task.taskId}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.employee}</td>
                            <td>{task.department}</td>
                            <td>{task.date}</td>
                            <td>{task.timePeriod}</td>
                            <td
                                className={`IT22090508-employeeTaskview-status ${
                                    task.status.toLowerCase().replace(' ', '-')
                                }`}
                            >
                                {task.status}
                            </td>
                            <td>
                                <button
                                    className="IT22090508-employeeTaskview-button start"
                                    onClick={() => updateTaskStatus(index, 'In Progress')}
                                    disabled={task.status !== 'Pending'}
                                >
                                    Start Task
                                </button>
                                <button
                                    className="IT22090508-employeeTaskview-button complete"
                                    onClick={() => updateTaskStatus(index, 'Completed')}
                                    disabled={task.status === 'Completed'}
                                >
                                    Complete Task
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTaskView;