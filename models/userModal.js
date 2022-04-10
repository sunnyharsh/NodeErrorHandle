const mongoose = require("mongoose");
const validator= require('validator');
const bcrypt = require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please tell us your name."]
    },
    email:{
        type:String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide valid email']
    },
    photo:String,
    password:{
        type: String,
        required:[true, "please provide valid password"],
        minlength: 8,
        select:false
    },
    passwordConfirm:{
         type: String,
        required:[true, "please confirm your password"],
        validate:{
            validator:function(el){
                return el===this.password
            },
            message:"password are not same"
        }
    }

})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password, 12);
    this.passwordConfirm=undefined;
    next()
})
userSchema.methods.correctPassword=async function(candidatePwd, userPwd){
    return await bcrypt.compare(candidatePwd, userPwd)
}
const User=mongoose.model('Users', userSchema)
module.exports=User