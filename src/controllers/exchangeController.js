const { v4: uuidv4 } = require('uuid');
const { convert } = require('../services/exchangeService');
const transactions = require('../models/transaction');

exports.convertCurrency = async (req, res) => {
  const { sourceAmount, sourceCurrency, targetCurrencies } = req.body;
  if (!sourceAmount || !sourceCurrency || !targetCurrencies) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: 'sourceAmount, sourceCurrency and targetCurrencies are required' });
  }
  try {
    const conversionResults = await convert(sourceAmount, sourceCurrency, targetCurrencies);
    const transactionId = uuidv4();
    const transaction = {
      id: transactionId,
      sourceAmount,
      sourceCurrency,
      targetCurrencies,
      conversionResults,
      date: new Date(),
    };
    transactions.push(transaction);
    res.json({ transactionId, conversionResults });
  } catch (error) {
    res.status(500).json({ code: 'CONVERSION_ERROR', message: error.message });
  }

  return null;
};
