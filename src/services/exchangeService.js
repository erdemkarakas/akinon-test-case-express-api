const axios = require('axios');

const getRates = async (baseCurrency, targetCurrencies) => {
  const apiKey = process.env.CURRENCY_API_KEY;
  const apiUrl = process.env.CURRENCY_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/latest`, {
      params: {
        access_key: apiKey,
        base: baseCurrency,
        symbols: targetCurrencies.join(','),
      },
    });
    return response.data.rates;
  } catch (error) {
    throw new Error('Unable to fetch exchange rates');
  }
};

const convert = async (sourceAmount, baseCurrency, targetCurrencies) => {
  const rates = await getRates(baseCurrency, targetCurrencies);
  const conversionResults = targetCurrencies.reduce((acc, currency) => {
    acc[currency] = sourceAmount * rates[currency];
    return acc;
  }, {});
  return conversionResults;
};

module.exports = {
  getRates,
  convert,
};
