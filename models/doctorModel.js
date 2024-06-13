import mongoose from "mongoose";

const  doctorSchema = new mongoose.Schema({
    userId: {
        type:String,
    },
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
    hashedPassword:{
        type:String,
        required:true,
        minLength:6,
    },
    specializations:{
        type:String,
        required:true,
        maxLength:50,
    },
    qualifications:{
        type:String,
        required:true,
        maxLength:50,
    },
    phoneNumber:{
        type:Number,
        required:true,
        maxLength:10,
    },
    experiences:{
        type:String,
        required:true,
        maxLength:50,
    },
    fees:{
        type:Number,
        required:true,
    },
    timings:{
        type:Object,
        required:true,
    },
    role: {
        type: String,
        enum: "DOCTOR",
      },
    bloodGroup: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },  

},
    {
        timestamps:true,
    }
);

const Doctor = mongoose.model("Doctor",doctorSchema);

export default Doctor;