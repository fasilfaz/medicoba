import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

import { getAllDr, removeDrs } from '../controllers/doctorController.js';
import authAdmin from '../middlewares/adminMiddleware.js';
import upload from '../middlewares/imgUploadMdlw.js';
import { createService, deleteService, getServiceId, getServices, updateService } from '../controllers/serviceController.js';
import { getAppointment } from '../controllers/appointmentController.js';

const adminRouter = express.Router();

adminRouter.get('/getAllUsers',  getAllUsers);
adminRouter.get('/getAllDrs',  getAllDr);
adminRouter.delete('/removeDrs/:id', authAdmin,  removeDrs);
adminRouter.post("/add-services", upload.single("image"), authAdmin, createService);
adminRouter.get("/get-services", getServices );
adminRouter.put("/update-services/:id", upload.single("image"), authAdmin, updateService );
adminRouter.delete("/delete-services/:id", authAdmin, deleteService);
adminRouter.get("/get-servicesbyid/:id",  getServiceId);
adminRouter.get("/getAppointment" , getAppointment);


export default adminRouter;