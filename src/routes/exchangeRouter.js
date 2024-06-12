const express = require('express');

const router = express.Router();
const { convertCurrency } = require('../controllers/exchangeController');
const { getExchangeList } = require('../controllers/exchangeListController');
const { getExchangeRate } = require('../controllers/exchangeRateController');

router.get('/exchange-rate', getExchangeRate);
router.post('/exchange-convert', convertCurrency);
router.get('/exchange-list', getExchangeList);

module.exports = router;
