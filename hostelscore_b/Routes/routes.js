const express = require('express');
const {
    loginUser,
    registerUser,
    registerHostel,
    registerAdmin
} = require('../controller/authController.js');
const {
    getCustomer,
    getCustomerById
} = require('../controller/customerController.js');
const {
    getAllHostels,
    getHostelById
} = require('../controller/hotelController.js');
const {
    getLikedData,
    userLikedHostel,
    updateUserLikedHostel,
    getHostelLikesByID
} = require('../controller/likedController.js');

const {changePassword} = require('../controller/passwordController.js')

const authenticateToken = require('../authenticController/authentic.js'); // Import the authentication middleware

const router = express.Router();

// Authentication and registration routes
router.post('/api/auth/login', loginUser); // Login route
router.post('/api/auth/register/user', registerUser); // Register a new customer
router.post('/api/auth/register/hostel', registerHostel); // Register a new hostel
router.post('/api/auth/register/admin', registerAdmin); // Register a new admin

// Customer routes
router.get('/api/customers', authenticateToken, getCustomer); // Get all customers
router.get('/api/customers/:id', authenticateToken, getCustomerById); // Get a customer by ID or search input

// Hostel routes
router.get('/api/hostels', authenticateToken, getAllHostels); // Get all hostels
router.get('/api/hostels/:id', authenticateToken, getHostelById); // Get a hostel by ID or search input

// Liked data routes
router.get('/api/liked', authenticateToken, getLikedData); // Get liked data (admin only)
router.post('/api/liked/:hostel_id', authenticateToken, userLikedHostel); // User likes a hostel
router.put('/api/liked/:hostel_id', authenticateToken, updateUserLikedHostel); // Update user liked rating for a hostel
router.put('/api/change_password', authenticateToken, changePassword); // Change password
router.get('/api/hostellikes/:hostel_id', authenticateToken, getHostelLikesByID); // Get liked hostel data (all users)

module.exports = router;