// user controller
const userRoles = require('../constants/index.js');
const userModel = require('../models/User.model');
const EmailService = require('../Services/Email/index');
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

exports.getUserById = async (req, res) => {
    // console.log(req.params.id);
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(404).send('user not found');
        }
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        console.log(user);

        const emailService = new EmailService(user.email, user.first_name, user.last_name);
        emailService.sendWelcome().then((result) => {
            console.log(result);
        })
            .catch((err) => {
                console.error(err);
            });

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });

    }
    catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    console.log(req.params.id);
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).send('user not found');
        }
        res.send(user);
    } catch (error) {
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
exports.createSellerRequest = async (req, res) => {
    console.log(req.body);
    try {
        const request = new sellerRequest(req.body);
        await request.save();
        res.status(200).json({
            status: 'success',
            data: {
                request,
            },
        });

    }
    catch (error) {
        res.status(500).send(error);
    }
}

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

exports.getSellerRequestByUserId = async (req, res) => {
    try{
        const request = await SellerRequest.findOne({user_id: req.params.id});
        res.status(200).json({
            status: 'success',
            data: {
                request,
            },
        });
    }
    catch(error){
        res.status(500).send(error);
    }
};

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