/**
 _____            _               _____                _                 _  _             
|  _  |          | |             /  __ \              | |               | || |            
| | | | _ __   __| |  ___  _ __  | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
| | | || '__| / _` | / _ \| '__| | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
\ \_/ /| |   | (_| ||  __/| |    | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
 \___/ |_|    \__,_| \___||_|     \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_|   
                                                                                        
 */

const Order = require('../models/Order.model');

exports.getAllOrdersForOneCustomer = async (req, res) => {
    try {
        const orders = await Order.find({customer: req.params.id});
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching orders",
            error: error.message,
        });
    }
}

exports.getAllOrdersForOneSeller = async (req, res) => {
    try {
        const orders = await Order.find({shop_owner: req.params.id});
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching orders",
            error: error.message,
        });
    }
}

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(200).json({
            status: 'success',
            data: {
                order,
            },
        });   
    } catch (error) {
        res.status(500).json({
            message: "Error while creating order",
            error: error.message,
        });
    }  
}

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                order,
            },
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            res.status(404).send('order not found');
        }
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}