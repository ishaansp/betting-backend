const jwt = require('jsonwebtoken')
const secretKey = "BETTINGAPP";
const adminsecretKey = "BETTINGAPPADMIN";

const auth= async (req, res, next)=>{
    console.log('request')
    try {
        let token= req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            if(req.body.role=='admin'){
                let user= await jwt.verify(token,adminsecretKey)
                req.body.userId=user.id
                next();
    
            }
            else{
                let user= await jwt.verify(token,secretKey)
                req.body.userId=user.id
                next();
    
            }
            
        }else{
            res.status(401).json({message:'unauthorized user'})
        }

    } catch (error) {
        console.log('error17', error)
        res.status(401).json({message:'unauthorized user'})
        
    }
}
module.exports=auth;