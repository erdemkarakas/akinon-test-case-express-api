const express = require('express');
const app = express();
require('dotenv').config();

const exchangeRateRouter = require('./routes/exchangeRate');
const exchangeRouter = require('./routes/exchange');
const exchangeListRouter = require('./routes/exchangeList');

app.use(express.json());

app.use('/api/exchange-rate', exchangeRateRouter);
app.use('/api/exchange', exchangeRouter);
app.use('/api/exchange-list', exchangeListRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
