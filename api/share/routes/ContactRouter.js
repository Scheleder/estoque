const express = require('express');
const ContactController = require('../controllers/ContactController');
const router = express.Router();

router.get('/', ContactController.getAll);
router.get('/:id', ContactController.getOne);
router.post('/', ContactController.create);
router.put('/:id', ContactController.update);
router.delete('/:id', ContactController.delete);

module.exports = router;