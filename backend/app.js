const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Bu satır önemli!

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json());

// Route'lar
app.use('/api/auth', authRoutes); // <- Bu şekilde kullan

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});