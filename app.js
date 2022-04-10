const express = require('express')
const cors= require('cors');
const bodyParser = require("body-parser");
const AppError = require('./utils/appError');
const globalErrorHandler=require("./controllers/errorController")
const  adminRoutes  = require('./routes/adminRoutes');
const mongoDB= require("./connections/connections");
const tourRoutes = require('./routes/tourRoutes');

process.on('uncaughtException', (err)=>{
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION 🔥 shutting down...")
    process.exit(1)
    
})
const app =express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
const PORT=process.env.PORT || 1234
// api routes
app.use('/api/v1/auth', adminRoutes)
app.use('/api/v1', tourRoutes)
//handle wrong api url
app.all('*', (req, res, next)=>{
    next(new AppError(`can't find ${req.originalUrl} on this server`, 400))
})
const server=app.listen(PORT, ()=>{
    console.log(`Node server connect on ${PORT} 🔥`);
    
})
//global error handle
app.use(globalErrorHandler)

process.on('unhandledRejection', err=>{
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION 🔥 shutting down...")
    server.close(()=>{
        process.exit(1)
    })
})

