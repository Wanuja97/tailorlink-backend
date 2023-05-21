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
        const orders = await CustomizeOrder.find({shopOwner: req.params.id});
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