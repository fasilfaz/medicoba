import mongoose from "mongoose";

const  doctorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
        maxLength:20,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hashPassword:{
        type:String,
        required:true,
        minLength:6,
    },
    specializations:{
        type:String,
        required:true,
        maxLength:50,
    },
    experiences:{
        type:String,
        required:true,
        maxLength:50,
    },
    feesPerCunsaltation:{
        type:Number,
        required:true,
    },
    timings:{
        type:Object,
        required:true,
    },   

},
    {
        timestamps:true,
    }
);

const doctor = mongoose.model("doctor",doctorSchema);

export default doctor;