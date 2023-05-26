/**
______                                        _     _____                _                 _  _             
| ___ \                                      | |   /  __ \              | |               | || |            
| |_/ /  __ _  _   _  _ __ ___    ___  _ __  | |_  | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
|  __/  / _` || | | || '_ ` _ \  / _ \| '_ \ | __| | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
| |    | (_| || |_| || | | | | ||  __/| | | || |_  | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
\_|     \__,_| \__, ||_| |_| |_| \___||_| |_| \__|  \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_|   
                __/ |                                                                                       
               |___/                                                                                        

 */
const paymentModel = require('../models/Payment.model')

exports.createPayment = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        const payment = new paymentModel(req.body);
        await payment.save();
        res.status(200).json({
            status: 'success',
            data: {
                payment,
            },
        });   
    } catch (error) {
        res.status(500).json({
            message: "Error while creating payment",
            error: error.message,
        });
    }  
}

exports.getAllPaymentsForOneSeller = async (req, res) => {
    try {
        const payments = await paymentModel.find({shop_owner: req.params.id});
        res.status(200).json({
            status: 'success',
            results: payments.length,
            data: {
                payments,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching payments",
            error: error.message,
        });
    }
}

exports.getAllPaymentsForOneCustomer = async (req, res) => {
    try {
        const payments = await paymentModel.find({customer: req.params.id});
        res.status(200).json({
            status: 'success',
            results: payments.length,
            data: {
                payments,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching payments",
            error: error.message,
        });
    }
}

