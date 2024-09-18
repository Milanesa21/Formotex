import { Router } from "express";
import { createGrupo, getGrupos, getGrupoById, deleteGrupos } from "../controllers/grupoController";

export const grupoRoutes = Router();

// Elimina el authMiddleware de las rutas
grupoRoutes.post('/', createGrupo);
grupoRoutes.get('/:organizacionId', getGrupos); // Actualiza la ruta para obtener grupos por organizacionId
grupoRoutes.get('/grupo/:id', getGrupoById); // Obtén un grupo por su ID
grupoRoutes.delete('/:id', deleteGrupos);
