import { Request, Response } from "express";
import Grupo from "../models/Grupo";
import Organizacion from "../models/Organizacion";
import Usuario from "../models/Usuario";


export const createGrupo = async (req: Request, res: Response) => {
    try {
        const { nombre, organizacionId } = req.body;
        const user = req.user as Usuario;

        const organizacion = Organizacion.findByPk(organizacionId);
        if (!organizacion) {
            return res.status(404).json({ msg: 'Organizacion no encontrada' });
        }
    

    const nuevoGrupo = await Grupo.create({ nombre, organizacionId });
    return res.status(201).json(nuevoGrupo);
} catch (error) {
    return res.status(500).json({ msg: 'Error al crear el grupo' });
}
};


export const getGrupos = async (req: Request, res: Response) => {
    try {
        const grupos = await Grupo.findAll();
        return res.status(200).json(grupos);
    } catch (error) {
        return res.status(500).json({ msg: 'Error al obtener los grupos' });
    }
}


export const getGupoById = async ( req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const grupos = await Grupo.findByPk(id);

        if (!grupos) {
            return res.status(404).json({msg: 'Grupo no encontrado'})
        }

        return res.status(200).json(grupos);
    } catch (error) {
        return res.status(500).json({msg: 'Error al obtener el grupo'})
    }
}

export const deleteGrupos = async  (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const grupo = await Grupo.findByPk(id);

        if (!grupo) {
            return res.status(404).json({msg: 'Grupo no encontrado'})
        }

        await grupo.destroy();
        return res.status(200).json({msg: 'Grupo eliiminado correctamente'});
    } catch (error){
        return res.status(500).json({msg: 'Error al eliminar el grupo'})
    }
}