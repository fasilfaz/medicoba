import mongoose from "mongoose";

const  appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    doctorId:{
        type:String,
        required:true,
    },
    doctorInfo: {
        type:String,
        required:true,
    },
    userInfo: {
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default: 'pending',
    },
    serviceId:{
        type:String,
    },
}, {
    timestamps:true,
})

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;