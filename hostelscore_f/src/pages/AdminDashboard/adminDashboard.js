import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [hostelLikes, setHostelLikes] = useState([]);
  // const [totalLikes, setTotalLikes] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://hostelscore-b.onrender.com/api/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch customers");
        const data = await response.json();
        console.log(data)
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchHostelLikes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://hostelscore-b.onrender.com/api/liked", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch hostel likes");
        const data = await response.json();
        setHostelLikes(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHostelLikes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchTerm, customers]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div className="loading">Loading...</div>;
  console.log(hostelLikes)

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Admin</span>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <section className="overview-section">
          <h2>Overview</h2>
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Customers</h3>
              <p className="stat-value">{customers.length}</p>
            </div>
            {/* <div className="stat-card">
              <h3>Total Likes</h3>
              <p className="stat-value">{totalLikes}</p>
            </div> */}
          </div>
        </section>

        <section className="hostel-likes-section">
          <h2>Hostel Likes</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Average Rating</th>
                  <th>Total Rating</th>
                </tr>
              </thead>
              <tbody>
                {hostelLikes.length > 0 ? (
                  <tr>
                    <td>{hostelLikes[0].avg_rating}</td>
                    <td>{hostelLikes[0].total_rating}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="2">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="customer-management-section">
          <h2>Customer Management</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search customers by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.name}</td>
                    <td>{customer.username}</td>
                    <td>{customer.age}</td>
                    <td>{customer.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
