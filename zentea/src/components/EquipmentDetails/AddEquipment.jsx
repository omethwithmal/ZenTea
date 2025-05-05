import React, { useState } from 'react';
import axios from 'axios';

const AddEquipment = ({ onAddSuccess }) => {
  const [formData, setFormData] = useState({
    serial_number: '',
    eqm_name: '',
    type: '',
    purchase_date: '',
    last_maintenance_date: '',
    next_maintenance_date: '',
    warrenty_information: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send POST request to add equipment
      const response = await axios.post('http://localhost:5000/equipments/addEquipment', formData);
      console.log('Equipment added:', response.data);

      // Reset form data
      setFormData({
        serial_number: '',
        eqm_name: '',
        type: '',
        purchase_date: '',
        last_maintenance_date: '',
        next_maintenance_date: '',
        warrenty_information: '',
        description: '',
      });

      // Notify parent component of success
      if (onAddSuccess) {
        onAddSuccess();
      }
    } catch (error) {
      console.error('Error adding equipment:', error);
      setError(error.message || 'Failed to add equipment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Equipment</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Serial Number */}
        <div style={styles.formGroup}>
          <label htmlFor="serial_number" style={styles.label}>
            Serial Number:
          </label>
          <input
            type="text"
            id="serial_number"
            name="serial_number"
            value={formData.serial_number}
            onChange={handleChange}
            placeholder="Enter serial number"
            required
            style={styles.input}
          />
        </div>

        {/* Equipment Name */}
        <div style={styles.formGroup}>
          <label htmlFor="eqm_name" style={styles.label}>
            Equipment Name:
          </label>
          <input
            type="text"
            id="eqm_name"
            name="eqm_name"
            value={formData.eqm_name}
            onChange={handleChange}
            placeholder="Enter equipment name"
            required
            style={styles.input}
          />
        </div>

        {/* Type */}
        <div style={styles.formGroup}>
          <label htmlFor="type" style={styles.label}>
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Enter type"
            required
            style={styles.input}
          />
        </div>

        {/* Purchase Date */}
        <div style={styles.formGroup}>
          <label htmlFor="purchase_date" style={styles.label}>
            Purchase Date:
          </label>
          <input
            type="date"
            id="purchase_date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Last Maintenance Date */}
        <div style={styles.formGroup}>
          <label htmlFor="last_maintenance_date" style={styles.label}>
            Last Maintenance Date:
          </label>
          <input
            type="date"
            id="last_maintenance_date"
            name="last_maintenance_date"
            value={formData.last_maintenance_date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Next Maintenance Date */}
        <div style={styles.formGroup}>
          <label htmlFor="next_maintenance_date" style={styles.label}>
            Next Maintenance Date:
          </label>
          <input
            type="date"
            id="next_maintenance_date"
            name="next_maintenance_date"
            value={formData.next_maintenance_date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {/* Warranty Information */}
        <div style={styles.formGroup}>
          <label htmlFor="warrenty_information" style={styles.label}>
            Warranty Information:
          </label>
          <input
            type="text"
            id="warrenty_information"
            name="warrenty_information"
            value={formData.warrenty_information}
            onChange={handleChange}
            placeholder="Enter warranty details"
            required
            style={styles.input}
          />
        </div>

        {/* Description */}
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="3"
            style={styles.textarea}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Adding...' : 'Add Equipment'}
        </button>
      </form>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
};

export default AddEquipment;