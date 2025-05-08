import React, { useState, useEffect } from 'react';

const TeaItemForm = () => {
  // State management
  const [teaItem, setTeaItem] = useState({
    id: '',
    teaType: '',
    description: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [teaItems, setTeaItems] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch tea items on component mount
  useEffect(() => {
    fetchTeaItems();
  }, []);

  // Fetch all tea items from API
  const fetchTeaItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8070/api/getItem');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTeaItems(data);
    } catch (error) {
      console.error('Error fetching tea items:', error);
      setError('Failed to load tea items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeaItem(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image file
      if (!file.type.match('image.*')) {
        setError('Please select a valid image file (JPEG, PNG, etc.)');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image file size should be less than 2MB');
        return;
      }
      
      setImageFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setTeaItem({
      id: '',
      teaType: '',
      description: '',
      price: '',
    });
    setImageFile(null);
    setPreviewImage('');
    document.getElementById('imageUpload').value = '';
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  // Validate form inputs
  const validateForm = () => {
    if (!teaItem.teaType.trim()) {
      setError('Tea type is required');
      return false;
    }
    if (!teaItem.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (teaItem.price === '' || isNaN(teaItem.price) || teaItem.price <= 0) {
      setError('Please enter a valid positive price');
      return false;
    }
    return true;
  };

  // Handle form submission (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('teaType', teaItem.teaType.trim());
      formData.append('description', teaItem.description.trim());
      formData.append('price', teaItem.price);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      let url = 'http://localhost:8070/api/addItem';
      let method = 'POST';

      if (isEditing) {
        if (!teaItem.id) {
          throw new Error('Invalid item ID for update');
        }
        url = `http://localhost:8070/api/updateItem/${teaItem.id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      setSuccess(isEditing ? 'Tea item updated successfully!' : 'Tea item added successfully!');
      resetForm();
      await fetchTeaItems();
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || (isEditing ? 'Failed to update tea item.' : 'Failed to add tea item.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Edit existing tea item
  const handleEdit = (item) => {
    if (!item || !item._id) {
      setError('Invalid item data for editing');
      return;
    }
    
    setTeaItem({
      id: item._id,
      teaType: item.teaType,
      description: item.description,
      price: item.price,
    });
    if (item.image) {
      setPreviewImage(item.image);
    } else {
      setPreviewImage('');
    }
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete tea item
  const handleDelete = async (id) => {
    if (!id) {
      setError('Invalid item ID for deletion');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this tea item?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:8070/api/deleteItem/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to delete item. Status: ${response.status}`);
      }

      // Update UI immediately
      setTeaItems(prevItems => prevItems.filter(item => item._id !== id));
      setSuccess('Tea item deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting tea item:', error);
      setError(error.message || 'Failed to delete tea item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8070/uploads/${imagePath.split('\\').pop()}`;
  };

  return (
    <div style={styles.container}>
      {/* Add/Edit Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>{isEditing ? 'Edit Tea Item' : 'Add New Tea Item'}</h2>
        
        {/* Error/Success Messages */}
        {error && <div style={styles.alertError}>{error}</div>}
        {success && <div style={styles.alertSuccess}>{success}</div>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Tea Type Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Tea Type:*
              <input
                type="text"
                name="teaType"
                value={teaItem.teaType}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="e.g., Green Tea, Oolong"
              />
            </label>
          </div>

          {/* Description Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Description:*
              <textarea
                name="description"
                value={teaItem.description}
                onChange={handleChange}
                required
                style={styles.textarea}
                placeholder="Describe the tea's flavor, origin, etc."
              />
            </label>
          </div>

          {/* Price Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Price:*
              <input
                type="number"
                name="price"
                value={teaItem.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                style={styles.input}
                placeholder="0.00"
              />
            </label>
          </div>

          {/* Image Upload */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Tea Image:
              <div style={styles.fileUploadContainer}>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                />
                <div style={styles.fileUploadButton}>
                  Choose File
                  {imageFile && <span style={styles.fileName}>{imageFile.name}</span>}
                </div>
              </div>
            </label>
            {previewImage && (
              <div style={styles.imagePreviewContainer}>
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  style={styles.imagePreview}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage('');
                    setImageFile(null);
                    document.getElementById('imageUpload').value = '';
                  }}
                  style={styles.removeImageButton}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Form Buttons */}
          <div style={styles.formButtons}>
            <button
              type="submit"
              disabled={isLoading}
              style={isLoading ? styles.submitButtonLoading : styles.submitButton}
            >
              {isLoading ? 'Processing...' : isEditing ? 'Update Item' : 'Add Item'}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tea Items Table */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableTitle}>Tea Collection</h2>
        {isLoading && teaItems.length === 0 ? (
          <div style={styles.loadingMessage}>Loading tea items...</div>
        ) : teaItems.length === 0 ? (
          <p style={styles.emptyMessage}>No tea items found. Add your first tea item above!</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableHeaderCell}>Image</th>
                  <th style={styles.tableHeaderCell}>Tea Type</th>
                  <th style={styles.tableHeaderCell}>Description</th>
                  <th style={styles.tableHeaderCell}>Price</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teaItems.map((item) => (
                  <tr key={item._id} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      {item.image ? (
                        <div style={styles.imageCell}>
                          <img 
                            src={getImageUrl(item.image)}
                            alt={item.teaType} 
                            style={styles.teaImage}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = 'No Image';
                            }}
                          />
                        </div>
                      ) : (
                        <span style={styles.noImage}>No Image</span>
                      )}
                    </td>
                    <td style={styles.tableCell}>{item.teaType}</td>
                    <td style={styles.tableCell}>{item.description}</td>
                    <td style={{...styles.tableCell, ...styles.priceCell}}>${item.price.toFixed(2)}</td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => handleEdit(item)}
                          style={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '40px 20px',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    width: '100%',
    maxWidth: '800px',
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '25px',
    fontSize: '28px',
    fontWeight: '600',
  },
  alertError: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    borderLeft: '4px solid #ef5350',
  },
  alertSuccess: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    borderLeft: '4px solid #4caf50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#2c3e50',
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    minHeight: '120px',
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box',
  },
  fileUploadContainer: {
    position: 'relative',
    marginTop: '8px',
  },
  fileInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: '0',
    cursor: 'pointer',
  },
  fileUploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 15px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  fileName: {
    fontSize: '14px',
    color: '#666',
    marginLeft: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px',
  },
  imagePreviewContainer: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '6px',
    border: '1px solid #eee',
  },
  removeImageButton: {
    padding: '8px 12px',
    backgroundColor: '#ffebee',
    color: '#c62828',
    border: '1px solid #ef9a9a',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    alignSelf: 'flex-start',
  },
  formButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  submitButton: {
    flex: '1',
    padding: '12px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonLoading: {
    flex: '1',
    padding: '12px',
    backgroundColor: '#81c784',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'not-allowed',
  },
  cancelButton: {
    flex: '1',
    padding: '12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  tableContainer: {
    width: '100%',
    maxWidth: '1200px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '30px',
  },
  tableTitle: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '25px',
    fontSize: '28px',
    fontWeight: '600',
  },
  loadingMessage: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  tableHeaderCell: {
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: '1px solid #eee',
    '&:nth-child(even)': {
      backgroundColor: '#f9f9f9',
    },
    '&:hover': {
      backgroundColor: '#f1f8e9',
    },
  },
  tableCell: {
    padding: '15px',
    verticalAlign: 'middle',
  },
  imageCell: {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teaImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '4px',
  },
  noImage: {
    color: '#999',
    fontSize: '14px',
  },
  priceCell: {
    fontWeight: '600',
    color: '#388e3c',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '8px 12px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#ffebee',
    color: '#f44336',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TeaItemForm;