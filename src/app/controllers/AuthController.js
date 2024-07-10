const bcrypt = require('bcrypt');
const User = require('../models/User');
const { ContainerWithChildren } = require('postcss/lib/container');

class AuthController {
    //GET Register
    async getALLUsers(req,res){
        try{
         const user = await User.find();
         res.status(200).json(user);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    async deleteUser(req, res){
        try{
            const user =  await User.findById(req.params.id);
            res.status(200).json("delete thành công ");
        
        } catch(err) {
           res.status(500).json(err);
        }
    }
}
module.exports = new AuthController();
