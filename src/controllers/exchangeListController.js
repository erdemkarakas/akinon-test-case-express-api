const transactions = require('../models/transaction');

exports.getExchangeList = (req, res) => {
    const { transactionId, startDate, endDate } = req.query;

    if (transactionId) {
        const transaction = transactions.find(tx => tx.id === transactionId);
        if (transaction) {
            return res.json(transaction);
        } else {
            return res.status(404).json({ code: 'NOT_FOUND', message: 'Transaction not found' });
        }
    } else if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const filteredTransactions = transactions.filter(tx => {
            const date = new Date(tx.date);
            return date >= start && date <= end;
        });
        return res.json(filteredTransactions);
    } else {
        return res.status(400).json({ code: 'BAD_REQUEST', message: 'Either transactionId or startDate and endDate must be provided' });
    }
};
