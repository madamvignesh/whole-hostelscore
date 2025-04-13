const cors = require('cors');
const express = require('express');
const initializeDatabase = require('./model/database.js'); // Import database initialization
const routes = require('./Routes/routes.js'); // Import routes

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
    try {
        const db = await initializeDatabase(); // Initialize the database

        // Attach the database instance to the request object for use in controllers
        app.use((req, res, next) => {
            req.db = db;
            next();
        });

        // Use modularized routes
        app.use(routes);

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        // Start the server
        const PORT = 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error.message);
    }
})();

