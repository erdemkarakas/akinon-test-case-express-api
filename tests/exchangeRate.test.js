const request = require('supertest');
const app = require('../src/app');

describe('GET /api/exchange/exchange-rate', () => {
  it('should return exchange rates', async () => {
    const response = await request(app)
      .get('/api/exchange/exchange-rate')
      .query({ sourceCurrency: 'EUR', targetCurrencies: 'USD,GBP,JPY' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('USD');
    expect(response.body).toHaveProperty('GBP');
    expect(response.body).toHaveProperty('JPY');
  });
});
