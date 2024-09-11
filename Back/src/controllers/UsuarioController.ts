import { Request, Response } from "express";
import UsuarioServices from "../services/UsuarioServices";

class UsuarioController {
    public async registrarUsuario(req:Request, res: Response) {
        try {
            const { username, password, role} = req.body;
            const usuario = await UsuarioServices.createUsuario(username, password, role);
            res.json(usuario);
        } catch (error) {
            res.status(400).json( error);
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
}

export default new UsuarioController();