import { Request, Response } from "express";
import Organizacion from "../models/Organizacion";
import Usuario from "../models/Usuario";
import { json } from "sequelize";
import { CustomRequest } from "../types/express/customRequest";

export const CreateOrganizacion = async ( req: CustomRequest, res: Response) => {
    try {
        const {nombre } = req.body;
        const user = req.user as Usuario

        if (user.role != 'admin') {
            return res.status(400).json({msg: 'No tienes permisos para crear organizaciones'})
        }

        const nuevaOrganizacion = await Organizacion.create({ nombre});
        return res.status(201),json(nuevaOrganizacion);
    } catch(error) {
        return res.status(500).json({msg: 'Error al crear la organizacion'})
    }
};

export const getOrganizaciones = async ( req: Request, res: Response) => {
    try {
        const organizaciones = await Organizacion.findAll();
    } catch (error) {
        return res.status(500). json({msg: 'Error al obtener las organizaciones'})
    }
};

export const getOganizacionById = async(req: Request, res:Response ) => {
    try {
        const {id} = req.params;
        const organizacion = await Organizacion.findByPk(id);

        if (!organizacion) {
            return res.status(404).json({msg: 'Organizacion no encontrada'})
        }

        return res.status(200).json(organizacion);
    } catch (error) { 
        return res.status(500).json({msg: 'Error al obtener la organizacion'})
    }
};


export const deleteOrganizacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const organizacion = await Organizacion.findByPk(id);
        if (!organizacion) {
            return res.status(404).json({msg: 'Organizacion no encontrada'})
        }
    

    await organizacion.destroy();
    return res.status(200).json({msg: 'Organizacion eliminada correctamente'})
} catch (error) {
    return res.status(500).json({msg: 'Error al eliminar la organizacion'})
}
};
