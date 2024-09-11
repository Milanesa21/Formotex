import { Router } from "express";
import { register, login } from "../controllers/authController";
import { body } from "express-validator";

const routers = Router();

routers.post('/reguster', [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
    body('role').isIn(['empleado', 'administrador'])
], register);

routers.post('/login', [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty()
], login);

export default routers;