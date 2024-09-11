import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();

router.post("/register", UsuarioController.registrarUsuario);
router.post("/login", UsuarioController.login);
router.get("/", UsuarioController.obtenerUsuarios);
router.delete("/:id", UsuarioController.eliminarUsuario);

export default router;
