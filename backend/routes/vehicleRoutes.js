const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../middleware/authenticate'); // JWT doğrulama

// Tüm vehicle rotaları için JWT kontrolü
router.use(authenticate);

// vehicleRoutes.js
router.post("/add", vehicleController.addVehicle); // addVehicle fonksiyonu kontrol et!
module.exports = router;