const mongoose = require("mongoose");

const tourSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true, "A tour must have a name"],
        unique:true,
        trim:true,
        maxlength:[40, 'Atour must have less or equal than 40 characters'],
        minlength:[5, 'Atour must have more or equal than 10 characters'],
    },
    slug:String,
    duration:{
        type:Number,
        required:[true, 'a tour must have duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true, 'tour must have maxGroupSize']
    },
    diffculty:{
        type: String,
    },
    price:{
        type: Number,
    },
    summary:{
        type: String,
    },
    imgCover:{
        type: String,
    },
    ratingAvg:{
        type:Number,
        maxlength:[5, "rating should be less than 5"],
        required:[true, "user must have lang"]
    }
})
const Tour=mongoose.model('Tours', tourSchema);
module.exports=Tour;