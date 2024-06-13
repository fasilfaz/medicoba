import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (email , role) => {
    return jwt.sign({data:email , role}, secretKey, {expiresIn: "1d"});
}
 export const doctorToken = (email , role) => {
    return jwt.sign({ data:email , role}, secretKey, { expiresIn: "1d"});
 }