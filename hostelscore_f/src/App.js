import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

// Context
import { AuthProvider, useAuth } from "./context/AuthContext"

// Pages
import Home from "./pages/Home/home"
import Register from "./pages/Register/register"
import Login from "./pages/Login/login"
import Header from "./pages/Header/header"
import ChangePassword from "./pages/ChangePassword/changepassword"
import AdminDashboard from "./pages/AdminDashboard/adminDashboard"
import HostelList from './pages/HostelList/hostelList'
import HostelDetails from "./pages/HostelDetails/hostelDetails"

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={
              <ChangePassword />
          } />
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/hostels" element={<HostelList/>} />
          <Route path="/hostels/:hotel_id" element={ <HostelDetails /> } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
