const Tour=require("../models/tourModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.getAllTours=catchAsync(async ( req, res)=>{
    const data=await Tour.find({})
    console.log(x)
    res.status(201).json({
       status:"success",
       data
   })
})
exports.getTour=catchAsync(async ( req, res, next)=>{
    const data=await Tour.findById(req.params.id)

    //use this if condition during delete and update
    if(!data){
        return next(new AppError('No tour found with that ID', 404))
    }
    res.status(200).json({
       status:"success",
       data
   })
})
exports.createTours=catchAsync(async (req, res,next)=>{
        const data=await Tour.create(req.body)
        res.status(201).json({
            status:"success",
            data
        })
})

exports.getToursStats=catchAsync(async (req, res,next)=>{
    const stats=await Tour.aggregate([
        //price should be more than and equal 102
        // {
        //     $match: {price: { $gte: 102 } }
        // },
        { 
            $group: { 
                _id: "$ratingAvg", count: { $sum: 1 } ,

                //convert diffculty text in upper case
                // _id:{$toUpper:'$diffculty'},
                // numtours:{$sum:1},
                priceAvg:{ $avg: '$price'}
                // avgPrice:{$avg:'$price'}
            } ,
        },
        {
            $sort:{ priceAvg:1}

        }
       
    ])
   res.status(200).json({
       status:'success',
       data:{
        stats
       }
   })
})
exports.checkBody= (req, res, next)=>{ 
    if(!req.body.name && !req.body.lang){
        return res.status(404).json({
            status:"fail",
            msg:"bad request"
        })
    }
    next()
}
