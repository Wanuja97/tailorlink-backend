/*
  ___          _    _       _____                _                 _  _             
 / _ \        | |  | |     /  __ \              | |               | || |            
/ /_\ \ _   _ | |_ | |__   | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
|  _  || | | || __|| '_ \  | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
| | | || |_| || |_ | | | | | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
\_| |_/ \__,_| \__||_| |_|  \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_| 

*/

const userModel = require('../models/User.model');
const EmailService = require('../Services/Email/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { user_name, first_name, last_name, email, password } = req.body;
        // checking mandatory fileds
        if (!user_name || !first_name || !last_name || !email || !password) {
            res.status(400);
            throw new Error("Username, First name, last name, Email and Password are mandtor fields.");
        }

        // check user availability
        const userAvailable = await userModel.findOne({ email: email });
        if (userAvailable) {
            res.status(400);
            throw new Error("User already registered");
        }
        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);

        // Create new user in DB
        const user = await userModel.create({
            user_name,
            first_name,
            last_name,
            email,
            hash_password: hashPassword
        });
        console.log(`User created ${user}`);

        if (user) {
            const emailService = new EmailService(user.email, user.first_name, user.last_name);
            emailService.sendWelcome().then((result) => {
                console.log(result);
            })
                .catch((err) => {
                    console.error(err);
                });
            res.status(201).json({
                status: 'success',
                data: {
                    user: {
                        _id: user.id,
                        userName: user.user_name,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email
                    },
                },
            })
        } else {
            res.status(400);
            throw new Error("User data is not valid");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }

        const user = await userModel.findOne({ email: email });
        console.log(user)
        if (user && (await bcrypt.compare(password, user.hash_password))) {

            const accessToken = jwt.sign({
                user: {
                    username: user.user_name,
                    email: user.email,
                    id: user.id,
                    password: user.hash_password
                }
            }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "60m" }
            );
            res.status(200).json({
                status: "success",
                data: {
                    user: {
                        _id: user.id,
                        userName: user.user_name,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        accessToken: accessToken
                    },
                }
            })
        }
        else {
            res.status(400).json({
                status:"failed",
                message: "User not found"
            })
            // throw new Error("User not found");
        }
    }
    catch (err) {
        res.status(401).send(err);

    }
}