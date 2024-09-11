import { Router } from "express";
import { body } from "express-validator";
import { getEquipos, createEquipo } from "../controllers/equipoController";
import { verifyToken } from "../middlewares/authMiddleware";
import { isAdmin, isEmpleadoOrAdmin } from "../middlewares/roleMiddleware";

const routers = Router();

// Obtener todos los equipos (acceso para empleados y administradores)
routers.get('/', verifyToken, isEmpleadoOrAdmin, getEquipos);

// Crear un nuevo equipo (solo acceso para administradores)
routers.post('/', [
    verifyToken,
    isAdmin, // Middleware para verificar si es administrador
    body('nombre').isString(),
    body('estado').isString(),
    body('ubicacion').isString(),
    body('fechaAdquisicion').isDate(),
    body('grupoId').isInt()
], createEquipo);

export default routers;