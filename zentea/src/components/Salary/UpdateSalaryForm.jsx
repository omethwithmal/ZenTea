import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateSalaryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    employeeID: "",
    basicSalary: "",
    workHours: "",
    otHours: "",
    accountNumber: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/user/get/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching employee:", err.message);
        alert("Error fetching employee data.");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.employeeID || !formData.basicSalary || !formData.workHours) {
      setErrorMessage("All fields are required except OT hours and Account Number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8070/user/update/${id}`, formData);
      if (response.status === 200) {
        alert("Salary updated successfully");
        navigate("/EmployeeSalary");
      }
    } catch (err) {
      console.error("Error updating employee:", err.message);
      alert("Error occurred while updating salary.");
    }
  };

  return (
    <div className="form-container">
      <h2>Update Salary Details</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div style={{ color: "red", marginBottom: "15px" }}>{errorMessage}</div>}
        <div className="form-group">
          <label>Employee Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Basic Salary (Rs.):</label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Work Hours:</label>
          <input
            type="number"
            name="workHours"
            value={formData.workHours}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>OT Hours:</label>
          <input
            type="number"
            name="otHours"
            value={formData.otHours}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate("/EmployeeSalary")}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Update Salary
          </button>
        </div>
      </form>

      <style jsx>{`
        .form-container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 20px auto;
        }
        h2 {
          color: #0fcf00;
          text-align: center;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          font-weight: bold;
          display: block;
        }
        .form-group input {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .cancel-btn,
        .submit-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .cancel-btn {
          background-color: #f44336;
          color: white;
        }
        .submit-btn {
          background-color: #4caf50;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default UpdateSalaryForm;
