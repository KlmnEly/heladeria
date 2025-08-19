const express = require('express');
const router = express.Router();
const containerController = require('../controllers/container.controller');

router.get('/', containerController.getAllContainers);
router.get('/:id', containerController.getContainerById);

router.post('/', containerController.createContainer);
router.put('/:id', containerController.updateContainer);
router.delete('/:id', containerController.deleteContainer);

module.exports = router;