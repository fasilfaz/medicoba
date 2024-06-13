import Doctor from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { doctorToken } from "../utils/generateToken.js";
import dotenv from "dotenv"
dotenv.config();

export const register = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            password, 
            phoneNumber, 
            qualifications, 
            specializations, 
            fees, 
            timings, 
            experiences,
            age,
            gender,
            bloodGroup,
            role, 
             } = req.body;
        const doctorExist = await Doctor.findOne({ email}); 
        if (doctorExist) {
            return res.status(200).send("Doctor already exist");
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newDoctor = new Doctor({
            firstName, 
            lastName, 
            email, 
            hashedPassword, 
            phoneNumber, 
            qualifications, 
            specializations, 
            fees, 
            timings, 
            experiences,
            age,
            bloodGroup,
            gender,
            role: "DOCTOR",
        });
        const newDoctorCreated = await newDoctor.save();
        console.log(newDoctorCreated);
        if (!newDoctorCreated) {
            return res.status(200).send("Doctor not created");
        }
        const token = doctorToken(email , role);
        res.cookie("token", token);
        res.json({ message: "Register successfully", token });
        console.log("Register successfully");

    } catch (error) {
        console.error(error);
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const doctor = await Doctor.findOne({email});
        if (!doctor) {
            return res.status(200).send("Doctor not found");
        }
        const isMatch = await bcrypt.compare(password, doctor.hashedPassword);
        if (!isMatch) {
            return res.status(200).send("Invalid Password");
        }
        const token = doctorToken(email , doctor.role);
        res.cookie("token", token );
        res.json({message: "Doctor logged in successfully", token});
        console.log("Dr logged in");
    } catch (error) {
        console.error(error);
        res.status(403).send("Unauthorized");
    }
};

export const getAllDr = async (req, res) => {
    const doctors = await Doctor.find();
    return res.send(doctors); 
};

export const removeDrs = async (req, res) => {
   try {
     let {id} = req.params;
     let doesExist = await Doctor.findById(id);
     if(!doesExist) throw new Error ("Doctor with id not exist")
     console.log(id)
     await Doctor.findByIdAndDelete(id);
     res.status(200).send({message: "doctor deleted"})
   } catch (error) {
    console.error(error);
    res.status(400).send({error:'Error: ' + error.message})
   }
};