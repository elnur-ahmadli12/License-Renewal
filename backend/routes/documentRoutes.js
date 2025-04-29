const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const vehicleController = require('../controllers/vehicleController');

// Araç Ekle ➕
router.post('/', authenticate, vehicleController.addVehicle);

// Araç Sil ❌
router.delete('/:id', authenticate, vehicleController.deleteVehicle);

module.exports = router;