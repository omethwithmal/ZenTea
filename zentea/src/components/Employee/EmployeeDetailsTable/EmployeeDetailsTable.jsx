import React, { useState } from 'react';
import './EmployeeDetailsTable.css'; // Import the CSS file

const EmployeeDetailsTable = () => {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            employeeId: 'E001',
            birthDay: '1990-05-20',
            contactNumber: '1234567890',
            email: 'john.doe@example.com',
            homeAddress: '123 Main St, City',
            nationalId: 'NID123456789',
            startDate: '2020-01-15',
            jobTitle: 'Manager',
            department: 'Plantation Department',
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            employeeId: 'E002',
            birthDay: '1985-08-12',
            contactNumber: '0987654321',
            email: 'jane.smith@example.com',
            homeAddress: '456 Elm St, Town',
            nationalId: 'NID987654321',
            startDate: '2018-03-10',
            jobTitle: 'Supervisor',
            department: 'Production & Processing Department',
        },
    ]);

    const [editingEmployee, setEditingEmployee] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleEdit = (id) => {
        const employeeToEdit = employees.find((emp) => emp.id === id);
        setEditingEmployee(employeeToEdit);
    };

    const handleSave = (id) => {
        setEditingEmployee(null);
        // Add logic here to save changes to the backend or state
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredEmployees = employees.filter(
        (employee) =>
            employee.firstName.toLowerCase().includes(searchQuery) ||
            employee.lastName.toLowerCase().includes(searchQuery) ||
            employee.employeeId.toLowerCase().includes(searchQuery) ||
            employee.email.toLowerCase().includes(searchQuery) ||
            employee.department.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="IT22090508-Employee-Details-Form-container">
            {/* Search Bar */}
            <div className="IT22090508-Employee-Details-Form-search-bar">
                <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <i className="fas fa-search"></i>
            </div>

            <h1 className="IT22090508-Employee-Details-Form-title">Employee Details</h1>
            <table className="IT22090508-Employee-Details-Form-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee ID</th>
                        <th>Birthday</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Home Address</th>
                        <th>National ID</th>
                        <th>Start Date</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="text" defaultValue={employee.firstName} />
                                ) : (
                                    employee.firstName
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="text" defaultValue={employee.lastName} />
                                ) : (
                                    employee.lastName
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="text" defaultValue={employee.employeeId} />
                                ) : (
                                    employee.employeeId
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="date" defaultValue={employee.birthDay} />
                                ) : (
                                    employee.birthDay
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="tel" defaultValue={employee.contactNumber} />
                                ) : (
                                    employee.contactNumber
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="email" defaultValue={employee.email} />
                                ) : (
                                    employee.email
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <textarea defaultValue={employee.homeAddress} />
                                ) : (
                                    employee.homeAddress
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="text" defaultValue={employee.nationalId} />
                                ) : (
                                    employee.nationalId
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="date" defaultValue={employee.startDate} />
                                ) : (
                                    employee.startDate
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <input type="text" defaultValue={employee.jobTitle} />
                                ) : (
                                    employee.jobTitle
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <select defaultValue={employee.department}>
                                        <option value="Plantation Department">Plantation Department</option>
                                        <option value="Production & Processing Department">
                                            Production & Processing Department
                                        </option>
                                        <option value="Quality Control Department">Quality Control Department</option>
                                        <option value="Finance Department">Finance Department</option>
                                        <option value="Development Department">Development Department</option>
                                    </select>
                                ) : (
                                    employee.department
                                )}
                            </td>
                            <td>
                                {editingEmployee?.id === employee.id ? (
                                    <button
                                        className="IT22090508-Employee-Details-Form-save-button"
                                        onClick={() => handleSave(employee.id)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="IT22090508-Employee-Details-Form-edit-button"
                                        onClick={() => handleEdit(employee.id)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDetailsTable;