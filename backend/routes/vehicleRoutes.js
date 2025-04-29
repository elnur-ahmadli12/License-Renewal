const express = require('express');
const router = express.Router(); // ✅ Express'in Router'ını kullanın
const authenticate = require('../middleware/authenticate');
const vehicleController = require('../controllers/vehicleController');


// Araç silme endpoint'i
router.delete('/:id', authenticate, vehicleController.deleteVehicle);
router.post('/', authenticate, vehicleController.addVehicle); // ✅ BU SATIRI EKLEYİN
module.exports = router;