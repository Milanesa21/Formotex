import { Request, Response } from "express";
import UsuarioServices from "../services/UsuarioServices";
import { CustomRequest } from "../types/express/customRequest";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

class UsuarioController {
  public async registrarUsuario(req: Request, res: Response) {
    try {
      const { username, password, role } = req.body;
      const usuario = await UsuarioServices.createUsuario(
        username,
        password,
        role
      );
      res.json(usuario);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await UsuarioServices.autenticarUsuario(username, password);
      res.json({ token });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  public async obtenerUsuarios(req: Request, res: Response) {
    const usuarios = await UsuarioServices.obtenerUsuarios();
    res.json(usuarios);
  }

  public async eliminarUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = await UsuarioServices.eliminarUsuario(Number(id));
    res.json(usuario);
  }

  public async actualizarUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, role } = req.body;

      if (!username && !role) {
        return res.status(400).json({
          message: "Debe proporcionar un username o role para actualizar.",
        });
      }

      const usuarioActualizado = await UsuarioServices.actualizarUsuario(
        Number(id),
        { username, role }
      );

      if (!usuarioActualizado) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      res.json(usuarioActualizado);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error al actualizar el usuario", error });
    }
  }
  
public async obtenerUsuarioPorToken(req: CustomRequest, res: Response) {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "No hay token, autorización denegada." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
    const usuario = await Usuario.findByPk(decoded.id);
    
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado." });

    // Enviar directamente username y role
    res.json({ username: usuario.username, role: usuario.role });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener datos del usuario.", error });
  }
}
}

export default new UsuarioController();
