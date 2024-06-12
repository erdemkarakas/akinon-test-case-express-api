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

app.get('/', (req, res) => {
  res.json({
    message: 'Akinon Case Study - Exchange Rate API running!🔺',
  });
});

const exchangeRouter = require('./routes/exchangeRouter');

app.use('/api/exchange', exchangeRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
