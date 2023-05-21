const express = require('express')
const app = express.Router()
const orderproposalController = require('../controllers/OrderProposal.controller');

// importing User authorization middleware
const AuthMiddleware = require('./../middlewares/Auth/index');

// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);

// create order proposal route
app.route('/').post(orderproposalController.createOrderProposal);
// delete order proposal by id
app.route('/:id').delete(orderproposalController.deleteOrderProposal);
// get all order proposal for user
app.route('/customer/:id').get(orderproposalController.getAllOrderProposalForCustomer);
// get all order proposal for seller
app.route('/seller/:id').get(orderproposalController.getAllOrderProposalForSeller);
// update order proposal by id
app.route('/:id').patch(orderproposalController.updateOrderProposal);

module.exports = app ;