import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (email) => {
    return jwt.sign({data:email}, secretKey, {expiresIn: "1d"});
}