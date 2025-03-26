import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ProductCards from "./components/ProductCards/ProductCards";
import AttendanceForm from "./components/Employee/Userattendence";
import EmployeeProfile from "./components/Employee/employeeprofile";
import Sidebar  from "./components/Sidebar/Sidebar";
import EmployeeDashboard  from "./components/Employee/EmployeeDashboard/EmployeeDashboard";
import ManagementDashboard  from "./components/ManagementDashbord/ManagementDashbord";
import EmployeeTaskView  from "./components/Employee/EmployeeTaskView/EmployeeTaskView";
import AddEmployeeForm  from "./components/Admin/AddEmployeeForm/AddEmployeeForm";
import EmployeeDetailsTable  from "./components/Employee/EmployeeDetailsTable/EmployeeDetailsTable";
import IT22090508_QRcode_Scanner_Page from "./components/QRCodeScanner/QRCodeScanner";

// Kavishka Dilshan

import CheckoutForm from "./components/Payment/Payment";
import TeaOrderForm from "./components/Order/TeaOrderForm";
import OrderManagementDashboard from "./components/OrderManagementDashboard/OrderManagementDashboard";
import CustomerOrderDashboard from "./components/CustomerOrderDashBoard/CustomerOrderDashBoard";


 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/cart" element={<ProductCards />} />
      <Route path="/attendanceForm" element={<AttendanceForm />} />
      <Route path="/employeeprofile" element={<EmployeeProfile/>} />
      <Route path="/Sidebar" element={<Sidebar/>} />
     
      <Route path="/ManagementDashboard" element={<ManagementDashboard/>} />

      <Route path="/EmployeeDashboard" element={<EmployeeDashboard/>} />
      <Route path="/EmployeeTaskView" element={<EmployeeTaskView/>} />
      <Route path="/AddEmployeeForm" element={<AddEmployeeForm/>} />
      <Route path="/EmployeeDetailsTable" element={<EmployeeDetailsTable/>} />

      <Route path="/QRCodeScanner" element={<IT22090508_QRcode_Scanner_Page/>} />


                <Route path="/TeaOrderForm" element={<TeaOrderForm />} />
                <Route path="/CheckoutForm" element={<CheckoutForm />} />
                <Route path="/Orderdash" element={<OrderManagementDashboard />} />
                <Route path="/CustomerDash" element={<CustomerOrderDashboard />} />
               
     



      </Routes>
    </Router>
  );
}

export default App;
