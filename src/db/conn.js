const mongoose =  require("mongoose");

mongoose.connect("mongodb://localhost:27017/RegisterData",{

}).then(()=>{
    console.log("connection sucessful");
}).catch((e)=>{
    console.log(`${e}`);
})