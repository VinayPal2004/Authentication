import validator from 'validator';
import User from '../model/usermodel.js';
import  generateToken  from '../config/token.js';
import bcrypt from 'bcryptjs';
import cookie from 'cookie-parser';


export const registerUser = async(req,res)=>{
  try {
    const {name,email,password}= req.body;
    if (!name||!email||!password){
      return res.status(400).json({message:"Please fill all the fields"})
    }
    if(password.length <8){
       return res.status(400).json({message:"Password must be at least 8 characters"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    if(!validator.isEmail(email)){
      return res.status(400).json({message:"Please enter a valid email"})
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User already exists"})
    }
    const user = await User.create({
      name,
      email,
      password :hashedPassword
    });
     const token = await generateToken(user._id);
     res.cookie('token',token,
      {
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        maxage:7*24*60*60*1000
      })
      res.status(201).json({message:"User registered successfully",token})
     

  } catch (error) {
     res.status(500).json({message:"Internal server error",error})
     console.log("registeration unsuccessfull");
     
  }
  }