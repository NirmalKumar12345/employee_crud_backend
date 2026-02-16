import {Router} from 'express';
import {checkSchema} from 'express-validator'
import { CreateEmployeeValidationSchema } from '../utils/employee.validation.js';
import validate from '../middleware/validate.js'
import authMiddleWare from '../middleware/authMiddleWare.js';
import { createEmployee, deleteEmployee, getEmployee, getEmployeeById, getEmployeeByname, updateEmployee } from '../controllers/employee.controller.js';

const router =Router();

router.post("/create",checkSchema(CreateEmployeeValidationSchema),validate,authMiddleWare,createEmployee);

router.get("/getEmployee",authMiddleWare,getEmployee);

router.get("/getEmployeeById/:id",authMiddleWare,getEmployeeById);

router.get("/getEmployeeByName/:name",authMiddleWare,getEmployeeByname);

router.put("/update/:id",authMiddleWare,updateEmployee);

router.delete("/delete/:id",authMiddleWare,deleteEmployee);

export default router;