import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();



export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("mongodb connected");
    } catch (error) {
        console.log("Error connecting to mongoDB",error);
    }
    
};


