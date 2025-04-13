import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hostels, setHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
  
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid user JSON in localStorage:", err);
        localStorage.removeItem('user'); // Optional: cleanup bad data
      }
    }
  
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://hostelscore-b.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Change password function
  const changePassword = async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://hostelscore-b.onrender.com/api/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password change failed');
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Like a hostel function
  const likeHostel = async (hostelId) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hostelscore-b.onrender.com/api/liked/${hostelId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to like hostel');
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update like rating function
  const updateLikeRating = async (hostelId, rating) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://hostelscore-b.onrender.com/api/liked/${hostelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update rating');
      }
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch hostels function
  const fetchHostels = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error("User is not authenticated. Please log in.");
      }
  
      let url = "https://hostelscore-b.onrender.com/api/hostels";
  
      if (searchTerm) {
        url += `?input_search=${encodeURIComponent(searchTerm)}`;
      }
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const value = {
    user,
    token: localStorage.getItem('token'), // Added token to context value
    loading,
    error,
    login,
    logout,
    changePassword,
    likeHostel,
    updateLikeRating,
    fetchHostels,
    hostels,
    searchTerm,
    setSearchTerm,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};