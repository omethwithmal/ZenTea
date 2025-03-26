import React, { useState, useEffect } from 'react';

const EmployeeTaskView = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch tasks from the backend API
    useEffect(() => {
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
        fetchTasks();
    }, []);

    // Filter tasks based on search term
    const filteredTasks = tasks.filter(
        (task) =>
            task.taskID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Generate CSV file
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

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'white',
            minHeight: '100vh',
            width:'1255px',
            padding: '20px',
            margin:'100px',
        }}>
            {/* Search Bar */}
            <div style={{
                marginBottom: '20px',
                position: 'relative',
                maxWidth: '400px'
            }}>
                <input
                    type="text"
                    placeholder="Search by Task ID, Title, or Employee Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 35px 10px 10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        color: '#333'
                    }}
                />
                <i className="fas fa-search" style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#aaa'
                }}></i>
            </div>

            {/* Generate CSV Button */}
            <button
                onClick={generateCSV}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#2c3e50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '20px',
                    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
                }}
            >
                Generate CSV
            </button>

            {/* Task Table */}
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px',
                overflow: 'hidden'
            }}>
                <thead style={{
                    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                    color: 'white'
                }}>
                    <tr>
                        <th style={{ padding: '10px', textAlign: 'left' }}>T ID</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Employee Name</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Department</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Time Period</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task, index) => (
                        <tr key={index} style={{
                            borderBottom: '1px solid #eee',
                            background:
                                task.taskID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                task.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
                                    ? '#f9f9f9'
                                    : 'transparent'
                        }}>
                            <td style={{ padding: '10px' }}>{task.taskID}</td>
                            <td style={{ padding: '10px' }}>{task.title}</td>
                            <td style={{ padding: '10px' }}>{task.description}</td>
                            <td style={{ padding: '10px' }}>{task.employeeName}</td>
                            <td style={{ padding: '10px' }}>{task.department}</td>
                            <td style={{ padding: '10px' }}>{new Date(task.date).toLocaleDateString()}</td>
                            <td style={{ padding: '10px' }}>{task.timePeriodHours} hrs</td>
                            <td style={{
                                padding: '10px',
                                fontWeight: 'bold',
                                color:
                                    task.status === 'Completed'
                                        ? '#2ecc71'
                                        : task.status === 'In Progress'
                                            ? '#3498db'
                                            : '#f39c12'
                            }}>
                                {task.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTaskView;