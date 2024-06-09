import express from 'express';
import dotenv from "dotenv";
import {connectDb} from "./config/db.js";
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import doctorRouter from './routes/doctorRouter.js';
import adminRouter from './routes/adminRouter.js';
dotenv.config();

//rest object
const app = express();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

//routes
app.use("/api/v1/user",userRouter );
app.use("/api/v1/doctor",doctorRouter);
app.use("/api/v1/admin",adminRouter);

//port
const port = 3000;

//db connection
connectDb();
//routes
app.get('/', (req, res) => {
    res.status(200).send({
         message: "server running"
    });
});

//listen port

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});