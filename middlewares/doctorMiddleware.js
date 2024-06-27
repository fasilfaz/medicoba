import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { roles } from "../utils/constants.js";

dotenv.config();

function authDoctor(req, res, next) {
    try {
        // const token = req.cookies.token;
        // const token = localStorage.getItem("token");
        const token = req.headers["authorization"].split(":")[1];
        console.log(token);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log(err, "err");

            req.user = user;
            console.log(req.user, "userr");
            if (err) {
                return res.status(403).send("Unauthorized...");
            }else if (req.user.role === roles.doctor){
                next();
            }
            
        });
    } catch (error) {
        console.log(error);
        res.status(403).send("Unauthorized!!");
    };
};

export default authDoctor;



// import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
// import Doctor from '../models/doctorModel.js';
// dotenv.config();

// function authDoctor(req, res, next) {
//     try {
//         const token = req.cookies.token;
//         console.log(token);

//         if (!token) {
//             return res.status(403).send("Unauthorized");
//         }

//         jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//             console.log(err);
//             if (err) {
//                 return res.status(403).send("Unauthorized......");
//             } else {
//                 const findDoctor = await Doctor.findOne({ email: user.email });
//                 if (!findDoctor) {
//                     return res.json({ message: "authentication failed!", success: false });
//                 }
//                 req.user = findDoctor; 
//                 next();
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(403).send("Unauthorized");
//     };
// };

// export default authDoctor;