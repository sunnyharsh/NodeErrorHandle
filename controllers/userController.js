const User=require("../models/userModal")
const catchAsync = require("../utils/catchAsync")

exports.getAllUsers=catchAsync(async ( req, res)=>{ 
try{
    const data=await User.find({})
    res.status(201).json({
       status:"success",
       data
   })
  }catch(err){
      console.log(err)
  }
})