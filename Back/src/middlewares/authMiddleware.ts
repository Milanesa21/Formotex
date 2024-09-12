import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

interface CustomRequest extends Request {
    user?: { id: number; role: string };
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No hay token, autorización denegada." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    const usuario = await Usuario.findByPk((decoded as { id: number }).id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    req.user = { id: usuario.id, role: usuario.role };

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error de autenticación.", error });
  }
};
