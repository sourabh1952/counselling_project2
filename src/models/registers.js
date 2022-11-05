const mongoose = require("mongoose");

const FormSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true   
    },
    lastname:{
        type:String,
        required:true   
    },
    email:{
        type:String, 
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true   
    },
    phone:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    passward:{
        type:String,
        required:true   
    },
    confirmpassward:{
        type:String,
        required:true   
    }
    
})

// create a collection

const Formdata =  new mongoose.model("Formdataa",FormSchema);
module.exports = Formdata;