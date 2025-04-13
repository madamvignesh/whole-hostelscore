import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building, LogOut, Menu, User } from "lucide-react";
import "./header.css";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // Track authentication status
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Ensure user data is also removed
    setIsAuthenticated(false); // Update state to reflect logout
    navigate("/login"); // Use navigate for redirection
  };

  useEffect(() => {
    // Listen for changes in localStorage to update authentication status
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload.user_type; // Depends on your backend JWT structure
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const user_type = getUserIdFromToken(localStorage.getItem("token"));

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="brand">
            <Building size={24} />
            <span>HostelScore</span>
          </Link>
          {isAuthenticated && (
            <nav className="nav-links">
              <Link to="/hostels" className="nav-link">Hostels</Link>
            </nav>
          )}
        </div>
        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-dropdown">
              <div className="user-container">
              {user_type === "Admin" && (
                <Link to="/admin" className="admin-link">
                  Admin Panel
                </Link>
              )}
              <button className="icon-btn">
                <User size={20} />
              </button>
              </div>
              <div className="dropdown-content">
                <div className="dropdown-item">User</div>
                <Link className="dropdown-item" to="/change-password">
                  Change Password
                </Link>
                <div className="dropdown-item logout" onClick={logout}>
                  <LogOut size={16} />
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="ghost-btn">
                Login
              </Link>
              <Link to="/register" className="solid-btn">
                Register
              </Link>
            </div>
          )}
          <button className="mobile-menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
