import { Request, Response } from "express";
import EquipoInformatico from "../models/EquipoInformatico";

// Obtiene todos los equipos informáticos
export const getEquipos = async (req: Request, res: Response) => {
    try {
        const equipos = await EquipoInformatico.findAll();
        return res.status(200).json(equipos);
    } catch (error) {
        return res.status(500).json(error);
    }
};


// Crear un equipo nuevo (solo admins)
export const createEquipo = async (req: Request, res: Response) => {
    const {nombre, estado, ubicacion, fechaAdquisicion, grupoId} = req.body;

    try {
        const nuevoEquipo = await EquipoInformatico.create({nombre, estado, ubicacion, fechaAdquisicion, grupoId});
        return res.status(201).json(nuevoEquipo);
    } catch (error) {
        return res.status(500).json(error);
    }
};