const app=require("./app")
const PORT=process.env.PORT || 1234
const globalErrorHandler=require("./controllers/errorController")

process.on('uncaughtException', (err)=>{
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION 🔥 shutting down...")
    process.exit(1)
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

