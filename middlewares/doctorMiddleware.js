import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authDoctor(req, res, next) {
    try {
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Unauthorized");
            }
            req.user = user;
            console.log(req.user.role);
            next();
            if (req.user.role !== "doctor"){
                return res.send("not authorized");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(403).send("Unauthorized");
    };
};

export default authDoctor;