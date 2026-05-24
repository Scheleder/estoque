const express = require('express');
const SupplierController = require('../controllers/SupplierController');
const router = express.Router();

router.get('/', SupplierController.getAll);
router.get('/:id', SupplierController.getOne);
router.post('/', SupplierController.create);
router.put('/:id', SupplierController.update);
router.delete('/:id', SupplierController.delete);

module.exports = router;