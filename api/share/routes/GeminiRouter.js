const express = require('express');
const GeminiController = require('../controllers/GeminiController');
const router = express.Router();

router.post('/', GeminiController.getInfo);

module.exports = router;