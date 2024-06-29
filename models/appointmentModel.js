import mongoose from "mongoose";

const  appointmentSchema = new mongoose.Schema({
   
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