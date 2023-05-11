// user controller
const userModel = require('../models/User.model');
const EmailService  = require('../Services/Email/index');

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
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
        const emailService = new EmailService(user.email,user.first_name,user.last_name);
        emailService.sendWelcome().then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.error(err);
        });

    }
    catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
        await user.save();
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