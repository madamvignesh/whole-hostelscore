const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const initializeDatabase = require('../model/database.js');
const {v4: uuidv4} = require('uuid');

const loginUser = async (req, res) => {
    const db = await initializeDatabase();
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await db.get('SELECT * FROM all_passwords WHERE username = ?', [username]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        console.log(user.user_type, user.user_id)
        const token = jwt.sign({ current_id: user.user_id, user_type: user.user_type }, 'MY_SECRET_TOKEN', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const registerUser = async (req, res) => { 
    const db = await initializeDatabase();
    const {username, name, password, gender, age} = req.body;
    if (!username || !password || !name || !gender || !age) {
        return res.status(400).json({ error: 'given data is not provided' });
    }
    console.log(username, name, password, gender, age)
    try{
        const existingUser = await db.get('SELECT * FROM all_passwords WHERE username = ?', [username]);
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12); // Hash the password with 12 rounds
        const id = uuidv4(); // Generate a unique ID for the new user

        // Insert into the all_passwords table
        await db.run(
            'INSERT INTO all_passwords (user_id, username, password, user_type) VALUES (?, ?, ?, ?)',
            [id, username, hashedPassword, 'Customer'] // Assuming 'customer' is the user_type for customers
        );

        await db.run(
            'INSERT INTO customer (user_id,name,gender,age) VALUES (?, ?, ?, ?)',
            [id, name,gender, age]
        );
        res.status(201).json({ id, username, user_type: 'Customer' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const registerHostel = async (req, res) => {
    const db = await initializeDatabase();
    const { name, address, price, username, password } = req.body;
    if (!name || !address || !price || !username || !password) {
        return res.status(400).json({ error: 'All fields are required: name, location, address, price, rating, username, and password' });
    }
    console.log(name, address, price, username, password)
    //name: 'Happy Hotel', address: '123 Hyderabad 520110', price: '6500', username: 'happyhotel', password: 'happyhotel123'
    try {
        const hostel = await db.get('SELECT * FROM all_passwords WHERE username = ?', [username]);
        if (hostel) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        const id = uuidv4(); // Generate a unique ID for the new hostel
        const hashedPassword = await bcrypt.hash(password, 12); // Hash the password with 12 rounds

        // Insert into the hostels table
        await db.run(
            'INSERT INTO hostel (hotel_id, name, address, price) VALUES (?, ?, ?, ?)',
            [id, name, address, price]
        );

        // Insert into the users table
        await db.run(
            'INSERT INTO all_passwords (user_id, username, password, user_type) VALUES (?, ?, ?, ?)',
            [id, username, hashedPassword, 'Hostel'] // Assuming 'hostel' is the user_type for hostels
        );

        res.status(201).json({ id, name, address, price, user_type: 'Hostel' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const registerAdmin = async (req, res) => {
    const db = await initializeDatabase();
    const { username, password, name,contact_no } = req.body;
    console.log(username, password, name, contact_no)
    if (!username || !password || !name || !contact_no) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    
    try {
        const existingAdmin = await db.get('SELECT * FROM all_passwords WHERE username = ?', [username]);
        if (existingAdmin) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12); // Hash the password with 12 rounds
        const id = uuidv4(); // Generate a unique ID for the new user

        // Insert into the all_passwords table
        await db.run(
            'INSERT INTO all_passwords (user_id, username, password, user_type) VALUES (?, ?, ?, ?)',
            [id, username, hashedPassword, 'Admin'] // Assuming 'admin' is the user_type for admins
        );

        await db.run(
            'INSERT INTO system_admin (employee_id, employee_name,contact_number) VALUES (?, ?, ?)',
            [id, name, contact_no]
        );
        res.status(201).json({ id, username, user_type: 'Admin' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    loginUser,
    registerUser,
    registerHostel,
    registerAdmin
};