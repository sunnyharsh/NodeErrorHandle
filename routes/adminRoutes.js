const express=require('express');

const authController=require("../controllers/authController")
const userController=require("../controllers/userController")
const adminRoutes=express.Router()

adminRoutes.post("/signup", authController.signup)
adminRoutes.post("/login", authController.login)
adminRoutes.get("/users", userController.getAllUsers)


    
module.exports=adminRoutes
