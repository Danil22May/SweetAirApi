const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/fetch-city', locationController.fetchCity);
router.get('/locations', locationController.getLocations);
router.put('/locations/:id', locationController.updateLocation);
router.delete('/locations/:id', locationController.deleteLocation);

module.exports = router;
