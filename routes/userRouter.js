import express from "express";
import {
  // getAllNotifications,
  // deleteAllNotifications,
  login,
  // logout, 
  register,
  getuser,
} from "../controllers/userController.js";
import authenticateUser from "../middlewares/userMiddleware.js";
import User from "../models/userModel.js";
import upload from "../middlewares/imgUploadMdlw.js";
import { getDrById } from "../controllers/doctorController.js";
import { appointmentCrl } from "../controllers/appointmentController.js";

const userRouter = express.Router();

userRouter.get("/check-user", authenticateUser, async (req, res) => {
  console.log("hitted")

  
  const user = req.user;
  console.log(user)
  console.log("data", user.data);
  const findUser = await User.findOne({ email: user.data });
  if (!findUser) {
    return res.json({ message: "authentication failed", success: false });
  }
  res.json({ message: "authenticateUser", success: true });
});

// userRouter.get("/getuser", authenticateUser, async (req, res) => {

//     const user = req.user;
//     console.log("data", user.data);
//     const getUser = await User.findOne({ email: user.data});
//      if(!getUser){
//         return res.json({message: "can't get user details", success: false})
//      }
//      res.json({message: "user details get", success:true, data: getUser})
// });

userRouter.get("/", (req, res) => {
  res.send("user route");
});

userRouter.post("/login", login);
userRouter.post("/register", upload.single("image"), register);
// userRouter.post("/logout", logout);
// userRouter.post("/get-notification", getAllNotifications);
// userRouter.post("/delete-notification", deleteAllNotifications);
userRouter.get("/get-drbyid/:id", authenticateUser, getDrById);
userRouter.post("/book-appointment",  appointmentCrl);
userRouter.get("/getuser", authenticateUser, getuser);

export default userRouter;
