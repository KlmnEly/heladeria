const express = require('express');
const router = express.Router();
const flavorController = require('../controllers/flavor.controller');

router.get('/', flavorController.getAllFlavors);
router.get('/:id', flavorController.getFlavorById);

router.post('/', flavorController.createFlavor);
router.put('/:id', flavorController.updateFlavor);
router.delete('/:id', flavorController.deleteFlavor);

module.exports = router;