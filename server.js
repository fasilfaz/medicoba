import express from 'express';
import dotenv from "dotenv";
import {connectDb} from "./config/db.js";
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import doctorRouter from './routes/doctorRouter.js';
import adminRouter from './routes/adminRouter.js';
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: ['https://medico-eight.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Add headers for additional CORS support
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Date, Etag');
    next();
});

app.use(express.json());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/admin", adminRouter);

const port = process.env.PORT || 3000;

// DB connection
connectDb();

app.get('/', (req, res) => {
    res.status(200).send({
        message: "server running"
    });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});