// index.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticateToken = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});