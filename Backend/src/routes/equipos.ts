import { Router } from "express";
import equipoController from "../controllers/equipoController";

export const equipoRoutes = Router();

equipoRoutes.post("/", equipoController.crearEquipo);
equipoRoutes.get("/", equipoController.obtenerEquipos);
equipoRoutes.get("/:id", equipoController.obtenerEquipoPorId);
equipoRoutes.put("/:id", equipoController.actualizarEquipo);
equipoRoutes.delete("/:id", equipoController.eliminarEquipo);


