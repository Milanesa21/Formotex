import { Router } from "express";
import { createGrupo, getGrupos, getGupoById, deleteGrupos } from "../controllers/grupoController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const grupoRoutes = Router();

grupoRoutes.post('/grupos', authMiddleware, createGrupo);
grupoRoutes.get('/grupos', authMiddleware, getGrupos);
grupoRoutes.get('/grupos/:id', authMiddleware, getGupoById);
grupoRoutes.delete('/grupos/:id', authMiddleware, deleteGrupos);