import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (email) => {
    return jwt.sign({data:email}, secretKey, {expiresIn: "1d"});
}
 export const doctorToken = (user) => {
    return jwt.sign({ data: user.id, role: user.role}, secretKey, { expiresIn: "1d"});
 }