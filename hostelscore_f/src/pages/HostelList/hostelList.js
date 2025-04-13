import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import "./hostelList.css";

const HostelList = () => {
  const [hostels, setHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debugging line
        
        if (!token) {
          navigator("/login");
        }
        let url = "https://hostelscore-b.onrender.com/api/hostels";

        // Add search parameter if searchTerm exists
        if (searchTerm) {
          url += `?input_search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hostels");
        }

        const data = await response.json();
        setHostels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Debounce API calls when searchTerm changes
    const timeoutId = setTimeout(() => {
      fetchHostels();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="hostel-list-container">
      <header className="page-header">
        <h1>Available Hostels</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search hostels by name or address..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {hostels.length === 0 ? (
        <div className="no-results">
          <p>No hostels found matching your search criteria.</p>
        </div>
      ) : (
        <div className="hostel-grid">
          {hostels.map((hostel) => (
            <div className="hostel-card" key={hostel._id}>
              <div className="hostel-card-content">
                <h3>{hostel.name}</h3>
                <p className="hostel-address">{hostel.address}</p>
                <p className="hostel-price">Price: ${hostel.price}/night</p>
                <Link to={`/hostels/${hostel.hotel_id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostelList;