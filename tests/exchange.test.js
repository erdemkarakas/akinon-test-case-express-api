const request = require('supertest');
const app = require('../server');

describe('POST /api/exchange', () => {
    it('should return converted amounts and transaction ID', async () => {
        const response = await request(app)
            .post('/api/exchange')
            .send({ amount: 100, sourceCurrency: 'USD', targetCurrencies: ['EUR', 'GBP'] });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('transactionId');
        expect(response.body).toHaveProperty('conversionResults');
        expect(response.body.conversionResults).toHaveProperty('EUR');
        expect(response.body.conversionResults).toHaveProperty('GBP');
    });
});
