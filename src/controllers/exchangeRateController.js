const axios = require('axios');

exports.getExchangeRate = async (req, res) => {
  const { sourceCurrency, targetCurrencies } = req.query;

  if (!sourceCurrency || !targetCurrencies) {
    return res.status(400).json({ code: 'INVALID_REQUEST', message: 'sourceCurrency and targetCurrencies are required' });
  }

  const targetCurrencyArray = targetCurrencies.split(',');

  const url = `${process.env.CURRENCY_API_URL}/latest`;
  const params = {
    access_key: process.env.CURRENCY_API_KEY,
    base: sourceCurrency,
    symbols: targetCurrencyArray.join(','),
  };

  try {
    const response = await axios.get(url, { params });
    if (response.data.success) {
      const { rates } = response.data;
      res.json(rates);
    } else {
      res.status(500).json({ code: 'EXCHANGE_RATE_ERROR', message: 'Unable to fetch exchange rates' });
    }
  } catch (error) {
    res.status(500).json({ code: 'EXCHANGE_RATE_ERROR', message: 'Unable to fetch exchange rates' });
  }
  return null;
};
