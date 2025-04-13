const initializeDatabase = require('../model/database.js');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
    const db = await initializeDatabase();
    const { current_id, user_type } = req.auth; // Extract user ID and type from the authenticated token
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
        return res.status(400).json({ error: 'Old password and new password are required' });
    }

    try {
        let tableName;

        console.log(current_id)
        // Fetch the user's current password hash
        const user = await db.get(`SELECT password FROM all_passwords WHERE user_id = ?`, [current_id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify the old password
        const isPasswordValid = await bcrypt.compare(old_password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Old password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(new_password, 12);

        // Update the password in the database
        await db.run(`UPDATE all_passwords SET password = ? WHERE user_id = ?`, [hashedPassword, current_id]);

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    changePassword
};