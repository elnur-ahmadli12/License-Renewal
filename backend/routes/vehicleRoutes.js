const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../middleware/authenticate'); // JWT doğrulama

// Tüm vehicle rotaları için JWT kontrolü
router.use(authenticate);

router.post('/add', vehicleController.addVehicle);

module.exports = router;