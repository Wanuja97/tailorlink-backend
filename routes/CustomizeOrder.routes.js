const express = require('express')
const app = express.Router()
const customizeOrder = require('../controllers/CustomizeOrder.controller');

// importing User authorization middleware
const AuthMiddleware = require('../middlewares/Auth/firebaseAuthMiddleware');


// user authorization middleware - applies to all routes defined after this
// app.use(AuthMiddleware.decodeToken);

// create customized order
app.route('/').post(customizeOrder.createCustomizeOrder);
// get all customized orders for one customer
app.route('/customer/:id').get(customizeOrder.getAllCustomizedOrderForOneCustomer);
// get all customized orders for one seller
app.route('/seller/:id').get(customizeOrder.getAllCustomizedOrderForOneSeller);
// update one customized order by id
app.route('/:id').patch(customizeOrder.updateCustomizeOrder);
// delete a customized order by id
app.route('/:id').delete(customizeOrder.deleteCustomizeOrder);

module.exports = app ;