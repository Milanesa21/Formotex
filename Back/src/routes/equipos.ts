import { Router } from "express";
import equipoController from "../controllers/equipoController";

const router = Router();

router.post("/", equipoController.crearEquipo);
router.get("/", equipoController.obtenerEquipos);
router.get("/:id", equipoController.obtenerEquipoPorId);
router.put("/:id", equipoController.actualizarEquipo);
router.delete("/:id", equipoController.eliminarEquipo);

export default router;
