
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { roles } from "../utils/constants.js";
import dotenv from "dotenv";
import sendMail from "../middlewares/sendMail.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import { generateToken } from "../utils/generateToken.js";
dotenv.config();

export const register = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "no file provided" });
        }
        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if (err) {
                console.log(err , "error");
                return res.status(500).json({
                    success: false,
                    message: "error",
                });
            }
            console.log(result);
            const imageUrl = result.url;
            const body = req.body;
            const { firstName,
                 lastName,
                  email,
                   password, 
                   age, 
                   gender, 
                   bloodGroup, 
                   phoneNumber, 
                   notifications, 
                   seennotifications,
                 } = body;
            const userExist = await User.findOne({ email});
            if (userExist) {
                return res.status(200).send("User already exist");
            }
    
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            let role = roles.patient;
            if (email === process.env.ADMIN_EMAIL){
                role = roles.admin;
            }
            const newUser = new User({
                firstName,
                lastName,
                email,
                hashPassword,
                age,
                gender,
                bloodGroup,
                role,
                phoneNumber,
                notifications,
                seennotifications,
                image: imageUrl,
            });
            console.log(newUser);
            const newUserCreated = await newUser.save();
            console.log(newUserCreated);
    
            if(!newUserCreated){
                return res.send("User not created");
            }
            const token = generateToken(email);
            res.cookie("token", token );
            res.json( {message:"Register successfully", token});
            sendMail(email, "Welcome to Medico Super Speciality Hospital", `Hi ${firstName} ${lastName} We are delighted to have you join our community. 
            Thank you for registering with us and trusting us with your healthcare needs.`)
            
            console.log("Register successfully")
        });
       
       
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if (!user) {
            return res.status(200).send("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.hashPassword);
        if (!isMatch) {
            return res.status(200).send("Invalid Password");
        }
        const token = generateToken(email);
        res.cookie("token", token );
        if (email === process.env.ADMIN_EMAIL){
            return res.json({message: "Admin logged in successfully", token});
        }
        
        res.json({ message: "logged in", token });
        console.log("logged in");

    } catch (error) {
        console.error(error,"error");
        res.status(500).send("Error while login");
    }
}
export const logout = async (req, res) => {
    try {
        
        res.clearCookie("token");
        res.json({ message: "logged out" });
        console.log("logged out");
    } catch (error) {
        console.error(error,"error");
        res.status(500).send("Error while logout");
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.send(users);
    } catch (error) {
        console.log(error)
    }
}

export const getAllNotifications = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        const notifications = user.notifications;
        const seennotifications = user.seennotifications;
        seennotifications.push(...notifications);
        user.notifications = [];
        user.seennotifications = notifications;
        const updatedUser = await user.save();
        res.status(200).send({
            message: "All Notifications fetched", 
            success: true,
            data: updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Error in notification", success: false, error})
    }
}
export const deleteAllNotifications = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.body.userId})
        user.notifications = [];
        user.seennotifications = [];
        const updatedUser = await user.save();
        updatedUser.hashPassword = undefined;
        res.status(200).send({
            message: "All Notifications deleted", 
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "unable to delete notification", success: false, error})
    }
}
