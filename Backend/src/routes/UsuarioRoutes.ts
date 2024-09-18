import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

export const authRoutes = Router();

authRoutes.post("/register", UsuarioController.registrarUsuario);
authRoutes.post("/login", UsuarioController.login);
authRoutes.get("/", UsuarioController.obtenerUsuarios);
authRoutes.put("/:id", UsuarioController.actualizarUsuario);
authRoutes.delete("/:id", UsuarioController.eliminarUsuario);
authRoutes.get("/me", UsuarioController.obtenerUsuarioPorToken);



