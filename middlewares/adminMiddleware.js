import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

function authAdmin(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).send("Unauthorized!");
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Unauthorized");
            } else if (user.data === process.env.ADMIN_EMAIL) {
                req.user = user;
                next();
            } else {
                return res.status(403).send("Invalid");
            }
        });
    } catch (error) {
        console.log(error);
        res.status(403).send("Unauthorized");
    }
};

export default authAdmin;


