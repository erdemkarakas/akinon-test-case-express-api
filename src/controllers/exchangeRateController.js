const { getRates } = require('../services/exchangeService');

exports.getExchangeRate = async (req, res) => {
  const { sourceCurrency, targetCurrencies } = req.query;

  if (!sourceCurrency || !targetCurrencies) {
    return res.status(400).json({ code: 'INVALID_REQUEST', message: 'sourceCurrency and targetCurrencies are required' });
  }

  const targetCurrencyArray = targetCurrencies.split(',');
  const response = await getRates(sourceCurrency, targetCurrencyArray);
  if (response) {
    return res.json(response);
  }
  return null;
};
