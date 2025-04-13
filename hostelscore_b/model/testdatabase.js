// testDatabase.js
const initializeDatabase = require('./database.js');

(async () => {
    try {
        const db = await initializeDatabase();
        console.log('Database connection successful.');
        const result = await db.all('SELECT name FROM sqlite_master WHERE type="table"');
        console.log('Tables:', result);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
})();