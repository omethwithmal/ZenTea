import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 


// ometh
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
import AttendanceDashboard from "./components/Employee/AttendanceDashboard/AttendanceDashboard";
import NotificationDashboard from "./components/Employee/NotificationDashboard/NotificationDashboard";
import EmployeeSalaryPayment from "./components/FinnacePayment/EmployeeSalaryPayment";
import EmpSignUp from "./components/Employee_Home/EmpSignUp";
import Navbar from "./components/Employee_Home/naveBar";
import HomePage from "./components/Employee_Home/EmployeeHome";





// Kavishka Dilshan

import CheckoutForm from "./components/Payment/Payment";
import TeaOrderForm from "./components/Order/TeaOrderForm";
import OrderManagementDashboard from "./components/OrderManagementDashboard/OrderManagementDashboard";
import CustomerOrderDashboard from "./components/CustomerOrderDashBoard/CustomerOrderDashBoard";
import PaymentDashboard from "./components/PaymentDashboard/PaymentDashboard";
import OrderDashboard1 from "./components/Customer/Customer";
import ProfilePage from "./components/Profile/ProfilePage";


// Dieepa

import FinancialDashboard from "../src/components/FinancialDashBoard/FinancialDashBoard";
import ViewOrderDetails from "../src/components/ViewOrderDetails/ViewOrderDetails";
import MaintenanceRevenue from "../src/components/MaintenanceRevebue/MaintenanceReveue";
import EmployeeSalaryTable from "../src/components/FinnacePayment/EmployeSalarytable";



import EmployeeSalary from "./components/Salary/EmployeeSalary";
import UpdateSalaryForm from "./components/Salary/UpdateSalaryForm";
import Notifications from "./components/FinancialDashBoard/Notifications";
import SummaryTable from "../src/components/SummaryTable/SummaryTable";


import EquipmentDashboard from "./components/EquipmentDetails/EquipmentDashboard";
import AddEquipment from "./components/EquipmentDetails/AddEquipment";
import IssueDetails from "./components/EquipmentIssue/IssueDetails";
import AddIssue from "./components/EquipmentIssue/AddIssue";
import UpdateIssue from "./components/EquipmentIssue/UpdateIssue";
import MaintenanceSchedule from "./components/EquipmentMaintenance/MaintenanceSchedule";
import AddMaintenance from "./components/EquipmentMaintenance/AddMaintenance";
import UpdateMaintenance from "./components/EquipmentMaintenance/UpdateMaintenance";
import EqmNotification from "./components/EquipmentDetails/EqmNotification";


// ometh
import EmployeeRegistrationForm from "./components/Employee_Home/EmployeeRegistrationForm";
import ZenTeaEmployeeProfile from "./components/Employee_Home/ZenTeaEmployeeProfile";
import EmployeeDetailsCart from "./components/Employee/EmployeeDetailsTable/EmployeeDetailsCart";
import ZenTeaEmployeeTable from "./components/Employee/EmployeeDetailsTable/ZenTeaEmployeeTable";
import AttendanceRecordCard from "./components/Employee/AttendanceDashboard/AttendanceRecordCard";
import QRAttendance from "./components/Employee/AttendanceDashboard/QRAttendance";
import TeaItemForm from "./components/itemManagement/Additem";
import TeaCartPage from "./components/itemManagement/cart";
import InventoryForm from "./components/Inventory/Inventory";
import InventoryTable from "./components/Inventory/InventoryData";
import Dashboard from "./components/Inventory/Dashboard";
import AnalyzePage from "./components/Inventory/Analyzie";





 

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

      <Route path="/AttendanceDashboard" element={<AttendanceDashboard/>} />
      <Route path="/NotificationDashboard" element={<NotificationDashboard/>} />
      <Route path="/EmployeeSalaryPayment" element={<EmployeeSalaryPayment/>} />
      <Route path="/Navbar" element={<Navbar/>} />
      <Route path="/HomePage" element={<HomePage/>} />
      <Route path="/EmpSignUp" element={<EmpSignUp/>} />

      <Route path="/EmployeeRegistrationForm" element={<EmployeeRegistrationForm/>} />
      <Route path="/ZenTeaEmployeeProfile" element={<ZenTeaEmployeeProfile/>} />
      <Route path="/EmployeeDetailsCart" element={<EmployeeDetailsCart/>} />
      <Route path="/ZenTeaEmployeeTable" element={<ZenTeaEmployeeTable/>} />
      <Route path="/AttendanceRecordCard" element={<AttendanceRecordCard/>} />
      <Route path="/QRAttendance" element={<QRAttendance/>} />


  
     



                <Route path="/TeaOrderForm" element={<TeaOrderForm />} />
                <Route path="/CheckoutForm" element={<CheckoutForm />} />
                <Route path="/Orderdash" element={<OrderManagementDashboard />} />
                <Route path="/CustomerDash" element={<CustomerOrderDashboard />} />
                <Route path="/PaymentDash" element={<PaymentDashboard />} />
                <Route path="/OrderDashboard1" element={<OrderDashboard1 />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
      

                
                <Route path="/FinancialDashboard" element={<FinancialDashboard />} />
                <Route path="/EmployeeSalary" element={<EmployeeSalary />} />
                <Route path="/ViewOrderDetails" element={<ViewOrderDetails/>} />
                <Route path="/MaintenanceRevenue" element={<MaintenanceRevenue/>} />    
                <Route path="/SummaryTable"  element={<SummaryTable/>}/>
                <Route path="/EmployeeSalaryTable" element={<EmployeeSalaryTable/>}/>
                
                <Route path="/update-employee/:id" element={<UpdateSalaryForm />} />
                <Route path="/notifications" element={<Notifications />} />




      <Route path="/EquipmentDashboard" element={<EquipmentDashboard />} />
      <Route path="/AddEquipment" element={<AddEquipment />} />
      <Route path="/EqmNotification" element={<EqmNotification />} />

      <Route path="/MaintenanceSchedule" element={<MaintenanceSchedule />} />
      <Route path="/AddMaintenance" element={<AddMaintenance />} />
      <Route path="/updateMaintenance/:id" element={<UpdateMaintenance />} />

      <Route path="/IssueDetails" element={<IssueDetails />} />
      <Route path="/AddIssue" element={<AddIssue />} />
      <Route path="/UpdateIssue" element={<UpdateIssue />} />
      <Route path="/issues/update/:id" element={<UpdateIssue />} />

      <Route path="/add-tea-item" element={<TeaItemForm />} />
      <Route path="/TeaCartPage" element={<TeaCartPage/>}/>

      <Route path="/inventory-form" element={<InventoryForm />} />
      <Route path="/inventory-table" element={<InventoryTable />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analyze" element={<AnalyzePage />} />
    
      </Routes>
    </Router>
  );
}

export default App;
