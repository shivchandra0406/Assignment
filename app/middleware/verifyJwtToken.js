
const jwt = require('jsonwebtoken')

const verifyJwtToken = async(req,res,next)=>{
    try{
        //console.log(req.cookies);
        const accessToken = req.headers['authorization'].split(' ')[1]
        if(!accessToken){
            console.log("accessToken",accessToken);
            throw new Error();
        }
        const userData = jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET)
        if(!userData){
            throw new Error();
        }
        if(userData.accountType==1){
            req.userData = userData 
            next()
        }else{
            return res.status(403).json({message:'Access denied'})
        }   
    }catch(err){
        if (err.message === 'jwt expired') {
            return res.status(408).json({Status:false,message:'Token expired'})
        }
        return res.status(403).json({message:'Forbidden'})
        //res.sendStatus(403);
    }
}

module.exports = verifyJwtToken