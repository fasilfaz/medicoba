import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

import { getAllDr, removeDrs } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.get('/getAllUsers',  getAllUsers);
adminRouter.get('/getAllDrs',  getAllDr);
adminRouter.delete('/removeDrs/:id', removeDrs)


export default adminRouter;