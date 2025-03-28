import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMaintenance = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        serial_number: '',
        eqm_name: '',
        description: '',
        last_maintenance_date: '',
        next_maintenance_date: '',
        technician: '',
        status: 'pending',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/maintenances/addMaintenance', formData);
            if (response.data.maintenance) {
                navigate('/MaintenanceSchedule');
            }
        } catch (err) {
            console.error('Error adding maintenance:', err);
            alert('Failed to add maintenance record. Please try again.');
        }
    };

    return (
        <div style={{
            maxWidth: '600px',
           
            margin: '40px auto',
            marginLeft:"550px",
            padding: '30px',
            background: '#f9f9f9',
            borderRadius: '16px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Poppins, sans-serif',
        }}>
            <h2 style={{
                textAlign: 'center',
                
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#333',
                marginBottom: '20px',
            }}>Add New Maintenance</h2>

            <form onSubmit={handleSubmit}>
                {/* Serial Number */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="serial_number" style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                    }}>Serial Number</label>
                    <input
                        type="text"
                        id="serial_number"
                        name="serial_number"
                        value={formData.serial_number}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                        required
                    />
                </div>

                {/* Equipment Name */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="eqm_name" style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                    }}>Equipment Name</label>
                    <input
                        type="text"
                        id="eqm_name"
                        name="eqm_name"
                        value={formData.eqm_name}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                        required
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="description" style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                    }}>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                        required
                    ></textarea>
                </div>

                {/* Last Maintenance Date */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="last_maintenance_date" style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                    }}>Last Maintenance Date</label>
                    <input
                        type="date"
                        id="last_maintenance_date"
                        name="last_maintenance_date"
                        value={formData.last_maintenance_date}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                        required
                    />
                </div>

                {/* Next Maintenance Date */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="next_maintenance_date" style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                    }}>Next Maintenance Date</label>
                    <input
                        type="date"
                        id="next_maintenance_date"
                        name="next_maintenance_date"
                        value={formData.next_maintenance_date}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                        required
                    />
                </div>

                {/* Technician */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="technician" style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                    }}>Technician</label>
                    <input
                        type="text"
                        id="technician"
                        name="technician"
                        value={formData.technician}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                        required
                    />
                </div>

                {/* Status */}
                <div style={{ marginBottom: '25px' }}>
                    <label htmlFor="status" style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#333',
                    }}>Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#37b400',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 20px',
                            borderRadius: '6px',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            width: '100%',
                            maxWidth: '200px',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2a8c00'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#37b400'}
                    >
                        Add Maintenance
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMaintenance;