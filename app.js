const express = require('express')
const cors= require('cors');
const bodyParser = require("body-parser");
const  adminRoutes  = require('./routes/adminRoutes');
const tourRoutes = require('./routes/tourRoutes');
const connection=require("./connections/connections")
const AppError = require('./utils/appError');

const app =express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// api routes
app.use('/api/v1/auth', adminRoutes);
app.use('/api/v1', tourRoutes);

//handle wrong api url
app.all('*', (req, res, next)=>{
    next(new AppError(`can't find ${req.originalUrl} on this server`, 400));
})

module.exports=app;