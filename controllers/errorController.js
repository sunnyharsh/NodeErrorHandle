const AppError = require("../utils/appError");

const handleDuplicateFieldDB=(err)=>{
    const message=`Duplicate field value ${err.keyValue.name}, please use another value`
    return new AppError(message, 400)
}
const handleCasteErrorDB=(err)=>{
    const message= `Invalid ${err.path} ${err.value}`;
    return new AppError(message, 400)
}
const handleValidationErrorDB=(err)=>{
    const errors=Object.values(err.errors).map(el=> el.message)
    const message=`Invalid input data ${errors.join('. ')}`
    return new AppError(message, 400)
}
const sendErrorDev=(err, res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        msg:err.message,
        stack:err.stack
    })
}
const sendErrorProd=(err, res)=>{
    //Opertional, trusted error: send msg to client
    if(err.isOpertional){
        res.status(err.statusCode).json({
            status:err.status,
            msg:err.message
        })
    }
    //programming or other unknown error: don't leak error details
    else{
        //send generic message
        res.status(500).json({
            status:'error',
            msg:'something went wrong'
        })
    }
}

module.exports=(err, req, res, next)=>{
    err.statusCode= err.statusCode || 500;
    err.status= err.status || 'error';
    if(process.env.NODE_ENV==="development"){
       sendErrorDev(err, res)
    }else if(process.env.NODE_ENV==="production"){
        let error={...err};
        if(err.name==="CastError") error=handleCasteErrorDB(error)
        if(err.code===11000) error=handleDuplicateFieldDB(error)
        if(err.name==="ValidationError") error=handleValidationErrorDB(error)
        sendErrorProd(error, res)
    }
}