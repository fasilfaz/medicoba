// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const secretKey = process.env.JWT_SECRET;

// export const generateToken = async  (email ) => { 
//     console.log(email);
//     return  jwt.sign({data:email}, secretKey, {expiresIn: "1d"});
// }
 import  Jwt  from "jsonwebtoken";
 import dotenv from "dotenv";
 dotenv.config();

 const secretKey = process.env.JWT_SECRET;

 export const generateToken = async  (email ) => {
    
     return  Jwt.sign({data:email }, secretKey, {expiresIn: "1d"});
 }