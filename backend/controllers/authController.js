const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Kayıt işlemi
const register = async (req, res) => {
  const { name, email, password, phone, driving_license_number, driving_license_expiry } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      'INSERT INTO users (name, email, password, phone, driving_license_number, driving_license_expiry) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, driving_license_number, driving_license_expiry]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Giriş işlemi
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user[0]) return res.status(404).json({ error: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };