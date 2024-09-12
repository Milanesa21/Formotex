import { Router } from "express";
import {
  CreateOrganizacion,
  deleteOrganizacion,
  getOganizacionById,
  getOrganizaciones,
} from "../controllers/OrganizationControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const organizacionRoutes = Router();

organizacionRoutes.post('/organizaciones', authMiddleware, CreateOrganizacion);
organizacionRoutes.get('/organizaciones', authMiddleware, getOrganizaciones);
organizacionRoutes.get("/organizaciones/:id",authMiddleware,getOganizacionById);
organizacionRoutes.delete('/organizaciones/:id', authMiddleware, deleteOrganizacion);

export { organizacionRoutes };