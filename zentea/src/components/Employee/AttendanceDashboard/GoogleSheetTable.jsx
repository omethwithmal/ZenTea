import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSheetTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/18NBrt1Ox0NqIYH2JxZw1SRVVrCG_MGF4BAaI4vcTUwk/export?format=csv&gid=1808602279";

  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((csvText) => {
        const rows = csvText.split("\n").map((row) => row.split(","));
        const headers = rows[0];
        const jsonData = rows.slice(1).map((row) =>
          row.reduce((obj, value, i) => {
            obj[headers[i]] = value;
            return obj;
          }, {})
        );
        setData(jsonData);
      });
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIdx, startIdx + rowsPerPage);

  // Styles
  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
    },
    sidebar: {
      width: "250px",
      background: "linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)",
      color: "white",
      padding: "20px 0",
    },
    sidebarHeader: {
      textAlign: "center",
      padding: "20px 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    sidebarLink: {
      display: "block",
      padding: "15px 20px",
      color: "white",
      textDecoration: "none",
      borderLeft: "4px solid transparent",
      cursor: "pointer",
    },
    activeLink: {
      backgroundColor: "rgba(255, 255, 255, 0.28)",
    },
    main: {
      flex: 1,
      padding: "20px",
      backgroundColor: "#f8f9fa",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
      textAlign: "center",
      color: "#333",
      
    },
    downloadBtn: {
      display: "block",
      margin: "0 auto 20px auto",
      padding: "10px 20px",
      background: "linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      width:"200px",
      marginRight:"10px",
    },
    searchInput: {
      padding: "8px",
      marginBottom: "20px",
      width: "100%",
      maxWidth: "400px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
    },
    th: {
      border: "1px solid #ddd",
      padding: "10px",
     background: "linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)",
      color: "#fff",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
    },
    trAlt: {
      backgroundColor: "#f2f2f2",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      gap: "5px",
      marginTop: "20px",
    },
    pageButton: {
      padding: "8px 12px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#28a745",
      color: "white",
      cursor: "pointer",
    },
    pageButtonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
    pageNumber: {
      padding: "8px 12px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: "#eee",
      cursor: "pointer",
    },
    activePage: {
      backgroundColor: "#28a745",
      color: "#fff",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <i className="fas fa-cogs" style={{ fontSize: "40px" }}></i>
          <h1 style={{ margin: "5px 0", fontSize: "35px" }}>Employee</h1>
          <h2 style={{ margin: "5px 0", fontSize: "25px", fontWeight: "normal" }}>Dashboard</h2>
        </div>
        <nav>
          <a style={styles.sidebarLink} onClick={() => navigate('/EmployeeDashboard')}>
            <i className="fas fa-users" style={{ marginRight: "10px" }}></i>
            Employee Task
          </a>
          <a style={styles.sidebarLink} onClick={() => navigate('/NotificationDashboard')}>
            <i className="fas fa-wallet" style={{ marginRight: "10px" }}></i>
            Notification
          </a>
          <a style={styles.sidebarLink} onClick={() => navigate('/AttendanceRecordCard')}>
            <i className="fas fa-truck" style={{ marginRight: "10px" }}></i>
            Mark Attendance
          </a>
          <a style={{ ...styles.sidebarLink, ...styles.activeLink }} onClick={() => navigate('/AttendanceDashboard')}>
            <i className="fas fa-truck" style={{ marginRight: "10px" }}></i>
            Employee Attendance
          </a>
          <a style={styles.sidebarLink} onClick={() => navigate('/EmployeeDetailsCart')}>
            <i className="fas fa-truck" style={{ marginRight: "10px" }}></i>
            Employee Details
          </a>
          <a style={styles.sidebarLink}>
            <i className="fas fa-boxes" style={{ marginRight: "10px" }}></i>
            Settings
          </a>
          <a style={styles.sidebarLink}>
            <i className="fas fa-tools" style={{ marginRight: "10px" }}></i>
            Log Out
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <h2 style={styles.heading}>Google Sheet Data Viewer</h2>

        {/* CSV Download Button */}
        <a href={csvUrl} download="EmployeeAttendance.csv" style={styles.downloadBtn}>
          Download CSV
        </a>

        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              {data[0] &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} style={styles.th}>
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, i) => (
              <tr key={i} style={i % 2 === 0 ? styles.trAlt : {}}>
                {Object.values(row).map((val, j) => (
                  <td key={j} style={styles.td}>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{
              ...styles.pageButton,
              ...(currentPage === 1 ? styles.pageButtonDisabled : {}),
            }}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                ...styles.pageNumber,
                ...(currentPage === i + 1 ? styles.activePage : {}),
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              ...styles.pageButton,
              ...(currentPage === totalPages ? styles.pageButtonDisabled : {}),
            }}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default GoogleSheetTable;
