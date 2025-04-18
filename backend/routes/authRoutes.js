const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Doğru import

// Değişiklik burada:
router.post('/register', authController.register); // authController. ekledik
router.post('/login', authController.login); // authController. ekledik

module.exports = router;