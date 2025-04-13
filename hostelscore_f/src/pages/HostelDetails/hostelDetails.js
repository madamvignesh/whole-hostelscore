import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import "./hostelDetails.css";

const HostelDetails = () => {
  const { hotel_id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [rateData, setRating] = useState(null);
  const [userLiked, setUserLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const { user, likeHostel, updateLikeRating } = useAuth();

  const token = localStorage.getItem("token");

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload.current_id; // Depends on your backend JWT structure
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  const getUserTypeFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload.user_type; // Depends on your backend JWT structure
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  if (!token) {
    navigator("/login");
  }
  console.log(token)


  // Fetch hostel details
  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        // Fetch Hostel by ID
        const response = await fetch(`https://hostelscore-b.onrender.com/api/hostels/${hotel_id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch hostel details");
        }
        const hostelFetchedData = await response.json();
        console.log("Hostel Data:", hostelFetchedData); // Debugging line
        setHostel(hostelFetchedData);

        // Fetching the rating by the Hostel ID

        const rateResponse = await fetch(`https://hostelscore-b.onrender.com/api/hostellikes/${hotel_id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const rateFetchedData = await rateResponse.json()
        const loggedUserId = getUserIdFromToken(token);
        console.log("Rating Data: ",rateFetchedData)
        const userRated = rateFetchedData.find(each => each.user_id === loggedUserId);
        if (userRated) {
          console.log(userRated)
          setUserLiked(true);
          setUserRating(userRated.rating);
        } else {
          console.log("Not Found")
        }
        
        setRating(rateFetchedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHostelDetails();
  }, [hotel_id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!hostel) {
    return <div className="error-message">Hostel not found</div>;
  }
  console.log("Initially",rateData)

  const handleRating = async (star) => {
    try {
      const url = `https://hostelscore-b.onrender.com/api/liked/${hotel_id}`;
      const options = {
        method: userLiked ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ liked_rating: star }),
      };
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error("Rating failed");
      }
  
      const data = await response.json();
      setUserRating(star);
      setUserLiked(true);
      setSuccessMessage(userLiked ? "Rating updated!" : "Hostel rated successfully!");
      
      // Optionally refresh rating data
      const rateRes = await fetch(`http://localhost:3001/api/hostellikes/${hotel_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRateData = await rateRes.json();
      setRating(updatedRateData);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while rating");
    }
  };
  
  const user_type = getUserTypeFromToken(token);

  return (
    <div className="hostel-details-container">
      <div className="hostel-details-card">
        <div className="hostel-header">
          <h1>{hostel.name}</h1>
        </div>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <div className="hostel-info">
          <div className="info-item">
            <h3>Address</h3>
            <p>{hostel.address}</p>
          </div>
          
          <div className="info-item">
            <h3>Price</h3>
            <p>${hostel.price}/night</p>
          </div>
        </div>

        {user_type === "Customer" && <div className="rating-section">
          <h3>Rate this Hostel</h3>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${userRating >= star ? "filled" : ""}`}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>}

        <h3>User Ratings</h3>
        {rateData ? (rateData.map((each) => {
          return (
            <div key={each.liked_id} className="user-rating">
              <p><strong>{each.name}</strong> ({each.age}, {each.gender})</p>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= each.rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          );
        })): (
          <p>No Rating Yet</p>
        )}


        <div className="hostel-actions">
          <Link to="/hostels">
            <Button variant="outline">Back to Hostels</Button>
          </Link>
          
          {user && (
            <Link to="/change-password">
              <Button>Change Password</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelDetails; 