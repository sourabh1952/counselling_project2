const mongoose =require('mongoose');

const Schema =mongoose.Schema;
const  sessionSchema = new Schema({
    cond:{type:Boolean,require:true},
    cond2:{type:Boolean,require:true},
    No:{type:Number,require:true},
    doctor:{type:String,require:true},
    sessionno:{type:String,require:true},
    sessiontime:{type:String,require:true},
    book:{type:String,require:true}
});

const Session = mongoose.model("Session",sessionSchema);
module.exports=Session;