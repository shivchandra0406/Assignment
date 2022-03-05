const Account = require('../models/account-model')
var jwt = require('jsonwebtoken');

class AccountController{

    async login(req,res){
        try{
            const {email,password,accountType} = req.body
            if(!email || !password || !accountType){
                return res.status(406).json({message:'email,password and accountType are required field for login'})
            }else{
                const result = await Account.findOne({email:email,accountType:accountType,password:password})
                if(!result){
                    return res.status(406).json({message:'email and password are not exist'})
                }else{
                    let payload = {
                        user_id:result._id,
                        accountType:accountType
                    }
                    const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
                    return res.status(200).json({
                        message:'Login successfully',
                        accessToken:accessToken
                    })
                }
            }
        }catch(err){
            console.log('login error',err);
            return res.status(400).json({message:'somthing went wrong'})
        }
    }
}

module.exports = new AccountController()