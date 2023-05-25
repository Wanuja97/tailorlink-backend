const express = require('express');
const app = express.Router();
const adminController = require('../controllers/Admin.Controller');


// get all users
app.route('/').get(adminController.getAllUsers);

// userban route
app.route('/ban/:id').patch(adminController.banUser);

// get all admins
app.route('/all').get(adminController.getAllAdmins);

// get all seller requests
app.route('/seller/requests/all').get(adminController.getAllSellerRequests);

// approve seller request route
app.route('/seller/request/approve/:id').patch(adminController.approveSellerRequest);

module.exports = app;