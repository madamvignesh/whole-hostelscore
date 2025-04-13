const initializeDatabase = require('../model/database.js');
const { v4: uuidv4 } = require('uuid'); 

const getLikedData = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    const {current_id, user_type} = req.auth;
    try {
        if (user_type === 'Admin') {
            const likedData = await db.all('SELECT AVG(rating) as avg_rating, COUNT(liked_id) as total_rating from Portal_Customer_Like');
            res.json(likedData);
        } else {
            res.json({ error: 'User is not an admin' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const userLikedHostel = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    const {current_id, user_type} = req.auth;
    const { hostel_id } = req.params;
    const {liked_rating} = req.body;
    if (!liked_rating) {
        return res.status(400).json({ error: 'Rating is required' });
    }
    try {
        const getlikeData = await db.get('SELECT * FROM Portal_Customer_Like WHERE user_id = ? AND hotel_id = ?', [current_id, hostel_id]);
        if (getlikeData) {
            return res.status(400).json({ error: 'User already liked this hostel' });
        }

        const hotel = await db.get('SELECT * FROM hostel WHERE hotel_id = ?', [hostel_id]);
        if (!hotel) {
            return res.status(404).json({ error: 'Hostel not found' });
        }
        const liked_id = uuidv4(); // Generate a unique ID for the new hostel
        await db.run(
            'INSERT INTO Portal_Customer_Like (liked_id, user_id, hotel_id, rating) VALUES (?, ?, ?, ?)',
            [liked_id, current_id, hostel_id, liked_rating]
        );
        res.status(201).json({ liked_id, current_id, hostel_id, liked_rating });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUserLikedHostel = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    const {current_id, user_type} = req.auth;
    const { hostel_id } = req.params;
    const {liked_rating} = req.body;
    if (!liked_rating) {
        return res.status(400).json({ error: 'Rating is required' });
    }
    try{
        const hotel = await db.get('SELECT * FROM hostel WHERE hotel_id = ?', [hostel_id]);
        if (!hotel) {
            return res.status(404).json({ error: 'Hostel not found' });
        }
        console.log(hotel)
        await db.run(
            'UPDATE Portal_Customer_Like SET rating = ? WHERE user_id = ? AND hotel_id = ?',
            [liked_rating, current_id, hostel_id]
        );
        res.status(200).json({ liked_rating }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getHostelLikesByID = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    const {current_id, user_type} = req.auth;
    const { hostel_id } = req.params;
    try {
        const likes = await db.all(`SELECT pcl.*, c.* 
             FROM Portal_Customer_Like pcl
             LEFT JOIN customer c 
             ON pcl.user_id = c.user_id 
             WHERE pcl.hotel_id = ?`, [hostel_id]);
        if (!likes) {
            return res.status(404).json({ error: 'No likes found for this hostel' });
        }
        res.json(likes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getLikedData,
    userLikedHostel,
    updateUserLikedHostel,
    getHostelLikesByID
}