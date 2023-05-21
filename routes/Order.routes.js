const express = require('express')
const app = express.Router()
const order = require('../controllers/Order.controller');

// importing User authorization middleware
const AuthMiddleware = require('./../middlewares/Auth/index');


// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);

// create order
app.route('/').post(order.createOrder);
// get all orders for one customer
app.route('/customer/:id').get(order.getAllOrdersForOneCustomer);
// get all orders for one seller
app.route('/seller/:id').get(order.getAllOrdersForOneSeller);
// update one order by id
app.route('/:id').patch(order.updateOrder);
// delete an order by id
app.route('/:id').delete(order.deleteOrder);

module.exports = app ;