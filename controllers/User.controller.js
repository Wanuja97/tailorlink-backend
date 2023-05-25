/* 
 _   _                    _____                _                 _  _             
| | | |                  /  __ \              | |               | || |            
| | | | ___   ___  _ __  | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
| | | |/ __| / _ \| '__| | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
| |_| |\__ \|  __/| |    | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
 \___/ |___/ \___||_|     \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_| 
 
*/
const userModel = require('../models/User.model');

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

