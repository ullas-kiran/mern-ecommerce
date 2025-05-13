
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const User=require('../models/user')

// register

const registerUser=async(req,res)=>{

    const {username,email,password}=req.body;

    try {

        const checkUser=await User.findOne({email});
        if(checkUser){
            return res.json({
                success:false,
                message:'User already exists with same email! Please try again'
            })
        }
        const hashPassword= await bcrypt.hash(password,12);
        const newUser=new User({
            username,email,password:hashPassword
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

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const checkUser= await User.findOne({email});
        if(!checkUser){
            res.json({
                success:false,
                message:"User doesn't exists! Please register first"
            })
        }

        const checkPasswordMatch=await bcrypt.compare(password,checkUser.password);
        if(!checkPasswordMatch){
            return  res.json({
                success:false,
                message:"Incorrect password! Please try again"
            })
        }

        const token = jwt.sign({
            id:checkUser?._id,role:checkUser?.role,email:checkUser?.email
        },'CLIENT_SECRET_KEY',{expiresIn:'60m'});

        res.cookie('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:'Logged successfully',
            user:{
                email:checkUser?.email,
                role:checkUser?.role,
                id:checkUser?._id
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"some error occured"
        })
    }
}


// logout
const logoutUser=(req,res)=>{
res.clearCookie('token').json({
    success:true,
    message:"Logout successfully"
})
}

// auth middleware

const authMiddleware=async(req,res,next)=>{
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
        success:false,
        message:"Unauthorised user!"
    })
  }
}

module.exports={registerUser,loginUser,logoutUser,authMiddleware}