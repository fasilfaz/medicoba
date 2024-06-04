import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(token);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log(err);
            if (err) {
                return res.status(403).send("Unauthorized");
            }
            req.user = user;
            console.log(req.user);
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(403).send("Unauthorized");
    };
}; 

export default authenticateUser;