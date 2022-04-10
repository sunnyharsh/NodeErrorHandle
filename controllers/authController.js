const User=require("../models/userModal");
const catchAsync = require("../utils/catchAsync");
const jwt=require('jsonwebtoken');
const AppError = require("../utils/appError");

const signToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES_IN} 
    )
}

exports.signup=  catchAsync(async (req,res, next)=>{
    const newUser= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    })
    const token=signToken(newUser._id)
    res.status(200).json({
        status:"success",
        token,
        data:{
            user:newUser
        }
    })
})

exports.login= catchAsync(async (req, res, next)=>{
    const {email, password} = req.body;
    // 1). check email and password are exist
    if(!email || !password){
       return next(new AppError('please provide email and password', 400))
    }
    // 2). check euser exists and password correct
    const user=await User.findOne({email}).select('+password')
    
    // const correct= 

    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Incorrect email and password', 401))
    }
    // 3). if everything is ok send token to client
    const token=signToken(user._id)
    res.status(200).json({
        status:'success',
        token
    })
})
exports.protect=catchAsync((req, res, next)=>{
    let token;
    if(req?.headers?.authorization && 
        req?.headers?.authorization.startsWith('Bearer')){
            token=req?.headers?.authorization.split(' ')[1]
            
    }
    if(!token){
        return next(new AppError('you are not logged in! please log in to get access', 401))
    }
    next()
})