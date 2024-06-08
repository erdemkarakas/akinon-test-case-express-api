const express = require('express');
const router = express.Router();
const exchangeListController = require('../controllers/exchangeListController');

router.get('/', exchangeListController.getExchangeList);

module.exports = router;
