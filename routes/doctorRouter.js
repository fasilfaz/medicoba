import express from "express";
import { login, register } from '../controllers/doctorController.js';
import Doctor from '../models/doctorModel.js';
import upload from "../middlewares/imgUploadMdlw.js";
import authenticateUser from "../middlewares/userMiddleware.js";


const doctorRouter = express.Router();

doctorRouter.get("/check-doctor",authenticateUser,  async (req, res) => {
    const doctor = req.user;
    console.log("data", doctor.data);
    const findDoctor =  await Doctor.findOne({email: doctor.email});
    if (!findDoctor) {
        return res.json({message: "authentication failed..", success: false})
    }
    res.json({message: "authenticateDoctor", success: true, findDoctor});
});


doctorRouter.get("/getdr", authenticateUser, async (req, res) => {
    console.log("doctor", req.user)
    const userDetails = req.user;
    console.log("data", userDetails);
    const getDr = await Doctor.findOne({email: userDetails.data});
    if(!getDr){
        return res.json({message: "can't get dr details", success: false})
    }
    res.json({message: "dr details get", success:true, data: getDr})
     
}); 



doctorRouter.post("/register",upload.single("image"), register);
doctorRouter.post("/login", login);

export default doctorRouter;