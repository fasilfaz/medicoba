import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

function authAdmin(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(token);

        if (!token) {
            return res.status(403).send("Unauthorized!");
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log(err);
            console.log("user",user);
            req.user = user;
            if (err) {
                return res.status(403).send("Unauthorized");
            } else if (req.user.data === process.env.ADMIN_EMAIL) {
                
                next();
            } else{
                return res.send("Invalid")
            }
            
            
        });
    } catch (error) {
        console.log(error);
        res.status(403).send("Unauthorized");
    };
   
};

export default authAdmin;


