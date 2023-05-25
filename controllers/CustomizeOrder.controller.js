/**
 _____              _                      _             _____            _               _____                _                 _  _             
/  __ \            | |                    (_)           |  _  |          | |             /  __ \              | |               | || |            
| /  \/ _   _  ___ | |_   ___   _ __ ___   _  ____  ___ | | | | _ __   __| |  ___  _ __  | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
| |    | | | |/ __|| __| / _ \ | '_ ` _ \ | ||_  / / _ \| | | || '__| / _` | / _ \| '__| | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
| \__/\| |_| |\__ \| |_ | (_) || | | | | || | / / |  __/\ \_/ /| |   | (_| ||  __/| |    | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
 \____/ \__,_||___/ \__| \___/ |_| |_| |_||_|/___| \___| \___/ |_|    \__,_| \___||_|     \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_|  
 
 */

const CustomizeOrder = require('../models/CustomizeOrder.model');

exports.getAllCustomizedOrderForOneCustomer = async (req, res) => {
    try {
        const orders = await CustomizeOrder.find({client: req.params.id});
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

exports.getAllCustomizedOrderForOneSeller = async (req, res) => {
    try {
        const orders = await CustomizeOrder.find({shop_owner: req.params.id});
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

exports.createCustomizeOrder = async (req, res) => {
    try {
        const order = new CustomizeOrder(req.body);
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

exports.updateCustomizeOrder = async (req, res) => {
    try {
        const order = await CustomizeOrder.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteCustomizeOrder = async (req, res) => {
    try {
        const order = await CustomizeOrder.findByIdAndDelete(req.params.id);
        if (!order) {
            res.status(404).send('order not found');
        }
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
}