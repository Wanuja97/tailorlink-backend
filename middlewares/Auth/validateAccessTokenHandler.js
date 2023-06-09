const jwt = require('jsonwebtoken');

class AccessTokenValidationMiddleware {
    validateToken(req, res, next) {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(" ")[1];
            // verify token
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401);
                    throw new Error("User is not authorized");
                }
                // console.log(decoded);
                req.user = decoded.user;
                next();
            });

            if (!token) {
                res.status(401);
                throw new Error("User is not authorized or token is missing");
            }
        }
        else{
            res.status(401);
                throw new Error("User is not authorized or token is missing");
        }
    }
}

module.exports = new AccessTokenValidationMiddleware();