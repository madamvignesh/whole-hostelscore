const initializeDatabase = require('../model/database.js');

const getCustomer = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    const {current_id, user_type} = req.auth;
    const {input_search} = req.query;
    if (user_type !== 'Admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    if (input_search){
        try{
            const customer = await db.all(`SELECT c.user_id, c.name, c.gender, c.age, ap.username 
                 FROM customer c 
                 LEFT JOIN all_passwords ap 
                 ON c.user_id = ap.user_id 
                 WHERE c.name LIKE '%${input_search}%'`);
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            res.json(customer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        try {
            const customer = await db.all('SELECT c.user_id, c.name, c.gender, c.age, ap.username FROM customer c LEFT JOIN all_passwords ap ON c.user_id = ap.user_id');
            res.json(customer); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const getCustomerById = async (req, res) => {
    const db = await initializeDatabase(); // Initialize the database connection
    
    const { id } = req.params;
    const {current_id, user_type} = req.auth;
    if (user_type !== 'Admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
  
    try {
        const customer = await db.get('SELECT * FROM customer WHERE user_id = ?', [id]);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getCustomer,
    getCustomerById
}  