const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Verify user credentials and create a token
exports.verifyUser = async (email, password) => {
    const [user] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return null;

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};
