import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { id: number; role: string }; // El rol se define al verificar el token.

    if (user.role !== 'admin') {
        return res.status(401).json({message: 'No tienes permisos para realizar esta acción'});
    }

    next();
};

export const isEmpleadoOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { id: number; role: string }; // El rol se define al verificar el token.

    if (user.role !== 'empleado' && user.role !== 'admin') {
        return res.status(401).json({message: 'No tienes permisos para realizar esta acción'});
    }

    next();
};