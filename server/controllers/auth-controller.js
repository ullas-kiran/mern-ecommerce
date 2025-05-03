
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require('../models/user')

// register

const registerUser=async(req,res)=>{

    const {userName,email,password}=req.body;

    try {

        const hashPassword= await bcrypt.hash(password,12);
        const newUser=new User({
            userName,email,password:hashPassword
        })


        await newUser.save();
        res.status(200).json({
            success:true,
            message:'Registration Success'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
    }

}


// login

const login=async(req,res)=>{

    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
    }
}


// logout


// auth middleware

module.exports={registerUser,login}