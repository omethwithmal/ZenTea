import { Link } from "react-router-dom";
import { FaUser, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
 // Ensure the correct path to your logo image

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "250px",
        position: "fixed",
        left: "0",
        top: "0",
        height: "100%",
        background: "linear-gradient(to bottom, #28a745, #004d00)", // Green gradient
        color: "white",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "8px",
            }}
          />
        </div>
        <nav>
          <Link
            to="/AdminManagementDashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            📊 Dashboard
          </Link>
          <Link
            to="/your-account"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
           🗳  Inventory Data
          </Link>
          <Link
            to="/settings"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            📶 Analyze
          </Link>
          <Link
            to="/help"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px",
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            <FaQuestionCircle /> Help
          </Link>
        </nav>
      </div>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <FaSignOutAlt /> Sign out
      </button>
    </aside>
  );
};

export default Sidebar;
