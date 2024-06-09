import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { roles } from '../utils/constants';
dotenv.config();

function authAdmin(req, res, next){
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Unauthorized");
        }
        req.user = user;
        console.log(req.user.role);
        if (req.user.role !== roles.admin) {
            return res.status(403).send("Unauthorized");
        }
        next();
    });
};

export default authAdmin;
