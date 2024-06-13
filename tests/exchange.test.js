const request = require('supertest');
const app = require('../src/app');

describe('POST /api/exchange/exchange-convert', () => {
  it('should return converted amounts and transaction ID', async () => {
    const response = await request(app)
      .post('/api/exchange/exchange-convert')
      .send({ sourceAmount: 100, sourceCurrency: 'EUR', targetCurrencies: ['USD', 'GBP', 'CAD', 'PLN'] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('transactionId');
    expect(response.body).toHaveProperty('conversionResults');
    expect(response.body.conversionResults).toHaveProperty('USD');
    expect(response.body.conversionResults).toHaveProperty('GBP');
    expect(response.body.conversionResults).toHaveProperty('CAD');
    expect(response.body.conversionResults).toHaveProperty('PLN');
  });
});
