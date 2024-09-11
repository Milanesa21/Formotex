import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No tienes permisos para realizar esta acción" });
  }

  try {
    // Verifica el token y asume que el tipo de resultado es JwtPayload
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      role: string;
    };

    // Asegúrate de que el objeto verificado tenga la estructura esperada
    if (
      typeof verified === "object" &&
      "id" in verified &&
      "role" in verified
    ) {
      req.user = verified;
      next();
    } else {
      return res.status(401).json({ message: "Token inválido" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
