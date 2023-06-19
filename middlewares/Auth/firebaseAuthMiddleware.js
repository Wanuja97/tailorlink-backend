const admin = require('../../config/firebase/firebase-config');
class AuthMiddleware {
	async decodeToken(req, res, next) {
		const token = req.headers.authorization.split(' ')[1];
        console.log(token)
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (e) {
            console.error(e);
			return res.json({ message: 'Internal Error' });
		}
	}
}
module.exports = new AuthMiddleware();