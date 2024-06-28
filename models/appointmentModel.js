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
}, {
    timestamps:true,
})

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;