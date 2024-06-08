const request = require('supertest');
const app = require('../server');

describe('GET /api/exchange-rate', () => {
    it('should return exchange rates', async () => {
        const response = await request(app)
            .get('/api/exchange-rate')
            .query({ sourceCurrency: 'EUR', targetCurrencies: 'USD,GBP,JPY' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('USD');
        expect(response.body).toHaveProperty('GBP');
        expect(response.body).toHaveProperty('JPY');
    });
});
