const request = require('supertest');
const app = require('../src/app');
const transactions = require('../src/models/transaction');

describe('GET /api/exchange-list', () => {
  beforeAll(() => {
    // Add a test transaction
    transactions.push({
      id: 'test-transaction-id',
      amount: 100,
      sourceCurrency: 'USD',
      targetCurrencies: ['EUR', 'GBP'],
      conversionResults: { EUR: 85, GBP: 75 },
      date: new Date().toISOString(),
    });
  });

  it('should return transaction by ID', async () => {
    const response = await request(app)
      .get('/api/exchange-list')
      .query({ transactionId: 'test-transaction-id' });

    // eslint-disable-next-line no-console
    console.log('Transactions before request:', transactions);
    // eslint-disable-next-line no-console
    console.log('Response:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'test-transaction-id');
  });

  it('should return transactions by date range', async () => {
    const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    const response = await request(app)
      .get('/api/exchange-list')
      .query({ startDate, endDate });

    // eslint-disable-next-line no-console
    console.log('Response:', response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return 400 if neither transactionId nor date range is provided', async () => {
    const response = await request(app)
      .get('/api/exchange-list');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('code', 'BAD_REQUEST');
  });
});
