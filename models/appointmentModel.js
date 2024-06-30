import mongoose from "mongoose";

const  appointmentSchema = new mongoose.Schema({
   
    doctorFName: {
        type:String,
        required:true,
    },
    userFName: {
        type:String,
        required:true,
    },
    userLName: {
        type:String,
        required:true,
    },
    doctorLName: {
        type:String,
        required:true,
    },
    userPhoneNumber: {
        type:Number,
        required:true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps:true,
})

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;