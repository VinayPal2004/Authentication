import jwt from 'jsonwebtoken';
 const generateToken =  (UserId)=>{
    try {
        return jwt.sign({id :UserId},process.env.JWT_SECRET, {expiresIn:'7d'})
    } catch (error) {
        console.log("token not generated from token.js");//fix
        
        
    }
 }
 export default generateToken;