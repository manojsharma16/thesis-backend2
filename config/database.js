const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

exports.connect = ()=>{
    mongoose.connect(MONGODB_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(()=>{
        console.log("Database connnected successfully");
    })
    .catch((error)=>{
        console.log("Database connection failed");
        console.log(error);
        process.exit(1)
    });
};