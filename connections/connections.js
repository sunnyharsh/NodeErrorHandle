const mongoose = require("mongoose");
const dotenv=require('dotenv')
dotenv.config({})
// const DB=process.env.DATABASE
const DB=process.env.DBURL;
mongoose.connect(DB, { 
    useNewUrlParser: true,
}).then(()=> console.log("DB connection successfully..."))
module.exports = {mongoose};


