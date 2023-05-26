const express = require('express');
const app = express.Router();

const payment = require('../controllers/Payment.controller');

// create payment
app.route('/').post(payment.createPayment);
// get all orders for one seller
app.route('/seller/:id').get(payment.getAllPaymentsForOneSeller);
// get all orders for one customer
app.route('/customer/:id').get(payment.getAllPaymentsForOneCustomer);

module.exports = app;

