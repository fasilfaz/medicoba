import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { roles } from "../utils/constants.js";
import dotenv from "dotenv";
import { response } from "express";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, } = req.body;
        const userExist = await User.findOne({ email});
        if (userExist) {
            return res.status(200).send("User already exist");
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        let role = roles.user;
        if (email === process.env.ADMIN_EMAIL){
            role = roles.admin;
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            hashPassword,
            role,
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
        console.log("Register successfully")
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

