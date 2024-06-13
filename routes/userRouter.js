import express from "express";
import { getAllNotifications,deleteAllNotifications, login, logout, register} from "../controllers/userController.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get("/check-user", authenticateUser, async (req, res) => {
    const user = req.user;
    console.log("data", user.data);
    const findUser =  await User.findOne({ email: user.email });
    if (!findUser) {
        return res.json({message: "authentication failed", success: false})
    }
    res.json({message: "authenticateUser", success: true});
})

userRouter.get("/getuser", authenticateUser, async (req, res) => {

    const user = req.user;
    const getUser = await User.findOne({ email: user.data});
     if(!getUser){
        return res.json({message: "can't get user details", success: false})
     }
     res.json({message: "user details get", success:true, data: getUser})
}); 
 
userRouter.get("/", (req, res) => {
    res.send("user route");
});

userRouter.post('/login', login);
userRouter.post("/register", register);
userRouter.post("/logout",logout);
userRouter.post("/get-notification", getAllNotifications);
userRouter.post("/delete-notification", deleteAllNotifications);


export default userRouter;