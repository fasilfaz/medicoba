import express from "express";
import authDoctor from '../middlewares/doctorMiddleware.js';
import { login, register } from '../controllers/doctorController.js';
import Doctor from '../models/doctorModel.js';


const doctorRouter = express.Router();

doctorRouter.get("/check-doctor", authDoctor, async (req, res) => {
    const doctor = req.user;
    const findDoctor =  await doctor.findOne({email: doctor.email});
    if (!findDoctor) {
        return res.json({message: "authentication failed", success: false})
    }
    res.json({message: "authenticateDoctor", success: true});
});

doctorRouter.get("/getdoctor", authDoctor, async (req, res) => {
    const doctor = req.user;

    const getDoctor = await Doctor.findOne({ email: doctor.data});
    if (!getDoctor){
        return res.json({message: "Doctor not found", success: false})
    }
    res.json({message: "Doctor details got", success:true, data: getDoctor})
});


doctorRouter.post("/register", register);
doctorRouter.post("/login", login);

export default doctorRouter;