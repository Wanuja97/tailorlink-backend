/*
 _____         _                                      _____                _                 _  _             
/  __ \       | |                                    /  __ \              | |               | || |            
| /  \/  __ _ | |_   ___   __ _   ___   _ __  _   _  | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
| |     / _` || __| / _ \ / _` | / _ \ | '__|| | | | | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
| \__/\| (_| || |_ |  __/| (_| || (_) || |   | |_| | | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
 \____/ \__,_| \__| \___| \__, | \___/ |_|    \__, |  \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_|   
                           __/ |               __/ |                                                          
                          |___/               |___/                                                           
*/

const categoryModel = require('../models/Category.model');
const UserRoles = require('../constants/index.js');
const userRoleAuthorization = require('../middlewares/Auth/getUserRole');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories,
            },
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.createCategory = async (req, res) => {
    try {
        const {category_name, user_id} = req.body;
        const role = await userRoleAuthorization.findUserRoleById(user_id);

        if(!((role == UserRoles.ADMIN) || (role == UserRoles.SUPERADMIN))){
            return res.status(401).json({
                status: 'failed',
                message: "User is not authorized"
            });
        }
        else{
            const category = await categoryModel.create({
                category_name,
                admin_id: user_id,
            });
    
            res.status(200).json({
                status: 'success',
                data: {
                    category,
                },
            });
        }
   
    } catch (error) {
        res.status(500).send(error);
    }  
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).send('category not found');
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
}

