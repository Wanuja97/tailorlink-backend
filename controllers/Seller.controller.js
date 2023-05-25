/*
 _____        _  _               _____                _                 _  _             
/  ___|      | || |             /  __ \              | |               | || |            
\ `--.   ___ | || |  ___  _ __  | /  \/  ___   _ __  | |_  _ __   ___  | || |  ___  _ __ 
 `--. \ / _ \| || | / _ \| '__| | |     / _ \ | '_ \ | __|| '__| / _ \ | || | / _ \| '__|
/\__/ /|  __/| || ||  __/| |    | \__/\| (_) || | | || |_ | |   | (_) || || ||  __/| |   
\____/  \___||_||_| \___||_|     \____/ \___/ |_| |_| \__||_|    \___/ |_||_| \___||_| 

*/

const sellerRequest = require('../models/SellerRequest.model');

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


exports.getSellerRequestByUserId = async (req, res) => {
    try{
        const request = await sellerRequest.findOne({user_id: req.params.id});
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