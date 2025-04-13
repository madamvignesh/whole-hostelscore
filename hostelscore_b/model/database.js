const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../hostelscoredb.db'); // Use absolute path for the database file

async function initializeDatabase() {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        console.log('Database connection established successfully.');
        return db; // Return the database instance
    } catch (error) {
        console.error(`DB Error: ${error.message}`);
        process.exit(1); // Exit the process if the database connection fails
    }
}

initializeDatabase()

module.exports = initializeDatabase;