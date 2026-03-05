import jwt from 'jsonwebtoken';
 const generateToken = async (UserId)=>{
    try {
        return jwt.sign({UserId},process.env.JWT_SECRET, {expiresIn:'7d'})
    } catch (error) {
        console.log("token not generated");
        
        
    }
 }
 export default generateToken;