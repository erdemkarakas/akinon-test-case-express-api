const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

const exchangeRateRouter = require('./routes/exchangeRate');
const exchangeRouter = require('./routes/exchange');
const exchangeListRouter = require('./routes/exchangeList');

app.use('/api/exchange-rate', exchangeRateRouter);
app.use('/api/exchange', exchangeRouter);
app.use('/api/exchange-list', exchangeListRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
