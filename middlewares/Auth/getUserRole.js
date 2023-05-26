const userModel = require('../../models/User.model');
class UserRole {
    async findUserRoleById(user_id) {
        try {
            const user = await userModel.findById(user_id);
            if(user && user.role){
                return user.role
            }
            else{
                return null;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UserRole();