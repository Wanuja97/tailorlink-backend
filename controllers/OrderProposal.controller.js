/**
 _____            _              ______                                         _   _____                _                 _  _             
|  _  |          | |             | ___ \                                       | | /  __ \              | |               | || |            
| | | | _ __   __| |  ___  _ __  | |_/ / _ __   ___   _ __    ___   ___   __ _ | | | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
| | | || '__| / _` | / _ \| '__| |  __/ | '__| / _ \ | '_ \  / _ \ / __| / _` || | | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
\ \_/ /| |   | (_| ||  __/| |    | |    | |   | (_) || |_) || (_) |\__ \| (_| || | | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
 \___/ |_|    \__,_| \___||_|    \_|    |_|    \___/ | .__/  \___/ |___/ \__,_||_|  \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_|   
                                                     | |                                                                                    
                                                     |_|                                                                                
 */

const orderProposalModel  = require('../models/OrderProposal.model');

exports.getAllOrderProposalForCustomer = async (req, res) => {
    try {
        const proposal = await orderProposalModel.find({customer: req.params.id});
        res.status(200).json({
            status: 'success',
            results: proposal.length,
            data: {
                proposal,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching proposals",
            error: error.message,
        });
    }
}

exports.getAllOrderProposalForSeller = async (req, res) => {
    try {
        const proposal = await orderProposalModel.find({shop_owner: req.params.id});
        res.status(200).json({
            status: 'success',
            results: proposal.length,
            data: {
                proposal,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while fetching proposals",
            error: error.message,
        });
    }
}

exports.createOrderProposal = async (req, res) => {
    try {
        const proposal = new orderProposalModel(req.body);
        await proposal.save();
        res.status(200).json({
            status: 'success',
            data: {
                proposal,
            },
        });   
    } catch (error) {
        res.status(500).json({
            message: "Error while creating proposal",
            error: error.message,
        });
    }  
}

exports.updateOrderProposal = async (req, res) => {
    try {
        const proposal = await orderProposalModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                proposal,
            },
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteOrderProposal = async (req, res) => {
    try {
        const proposal = await orderProposalModel.findByIdAndDelete(req.params.id);
        if (!proposal) {
            res.status(404).send('proposal not found');
        }
        res.send(proposal);
    } catch (error) {
        res.status(500).send(error);
    }
}