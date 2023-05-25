const express = require('express');
const app = express.Router();
const sellerController = require('../controllers/Seller.controller');

// seller request route
app.route('/request').post(sellerController.createSellerRequest);

// get seller request by id
app.route('/request/:id').get(sellerController.getSellerRequestByUserId);

module.exports = app ;