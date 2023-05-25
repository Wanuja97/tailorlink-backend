/*
  ___       _             _          _____                _                 _  _             
 / _ \     | |           (_)        /  __ \              | |               | || |            
/ /_\ \  __| | _ __ ___   _  _ __   | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
|  _  | / _` || '_ ` _ \ | || '_ \  | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
| | | || (_| || | | | | || || | | | | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
\_| |_/ \__,_||_| |_| |_||_||_| |_|  \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_|

*/

const userModel = require('../models/User.model');
const userRoles = require('../constants/index.js');
const sellerRequest = require('../models/SellerRequest.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};

exports.getAllAdmins = async (req,res)=>{
    console.log(userRoles.ADMIN)
    try{
        const admins = await userModel.find({role : userRoles.ADMIN});
        res.status(200).json({
            status: 'success',
            results: admins.length,
            data: {
                admins,
            },
        });
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.getAllSellerRequests = async (req, res) => {
    try {

        const requests = await SellerRequest.find();
        res.status(200).json({
            status: 'success',
            results: requests.length,
            data: {
                requests,
            },
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};

exports.approveSellerRequest = async (req, res) => {
    try {
        const updatedRequest = await sellerRequest.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(req.body.request_status === true){
            const updatedUser = await userModel.findByIdAndUpdate(updatedRequest.user_id, {role: "Seller"}, {
                new: true,
                runValidators: true
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                updatedRequest,
            },
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.banUser = async (req, res) => {
    try{
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {is_banned: true}, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                updatedUser,
            },
        });
    }
    catch(error){
        res.status(500).send(error);
    }
}