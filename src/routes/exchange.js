const express = require('express');

const router = express.Router();
const { convertCurrency } = require('../controllers/exchangeController');

router.post('/', convertCurrency);

module.exports = router;
