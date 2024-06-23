import Doctor from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import dotenv from "dotenv"
import { cloudinaryInstance } from "../config/cloudinary.js";
import sendMail from "../middlewares/sendMail.js";
dotenv.config();

export const register = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "no file provided" });

        }
        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err, "error");
                return res.status(500).json({
                    success: false,
                    message: "error",
                });
            }
            console.log(result);
            const imageUrl = result.url;
            const body = req.body;
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
                 } = body;

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
            image: imageUrl,
            role: "DOCTOR",
        });
        const newDoctorCreated = await newDoctor.save();
        console.log(newDoctorCreated);
        if (!newDoctorCreated) {
            return res.status(200).send("Doctor not created");
        }
        const token = generateToken(email);
        res.cookie("token", token);
        sendMail(email, "Welcome to Medico Super Speciality Hospital", `Hi Dr. ${firstName} ${lastName} We are delighted to have you join our community. 
            Thank you for registering with us and join our team.`)
            res.json( {message:"Register successfully", token});
            console.log("Register successfully")
        res.json({ message: "Register successfully", token });
        console.log("Register successfully");
        })
       
        

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
        const token = generateToken(email);
        res.cookie("token", token );
        console.log(token);
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

export const updateDr = async (req, res) => {
    const id = req.params.id;
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
         const updateDr = await Doctor.findByIdAndUpdate(
            { _id: id},
            { firstName, 
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
                role,},
                { new: true },
         );
         if (!updateDr) {
            return res.status(200).send("Doctor not updated");
         }
         console.log(updateDr);
         return res.send("Doctor updated");
};

export const getDrById = async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findById({ _id: id });
    console.log(doctor);
    if (!doctor) {
      return res.send("Doctor not found");
    }
    return res.json({ message: "doctor get by id", doctor: doctor, success: true });
  } catch (error) {
    console.log(error);
  }
};
