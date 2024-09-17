import { Request, Response } from "express";
import EquipoService from "../services/EquipoService";

class EquipoController {
    public async crearEquipo(req: Request, res: Response) {
        try {
            const { nombre, estado, ubicacion, fechaAdquisicion, grupoId } =
              req.body;
            const equipo = await EquipoService.crearEquipo({
              nombre,
              estado,
              ubicacion,
              fechaAdquisicion,
              grupoId,
            });
            res.json(equipo);
        } catch (error) {
            res.status(400).json(error);
        }
    }
    public async obtenerEquipos(req: Request, res: Response) {
        const equipos = await EquipoService.obtenerEquipos();
        res.json(equipos);
      }
    
      public async obtenerEquipoPorId(req: Request, res: Response) {
        const { id } = req.params;
        const equipo = await EquipoService.obtenerEquipo(Number(id));
        res.json(equipo);
      }
    
      public async actualizarEquipo(req: Request, res: Response) {
        const { id } = req.params;
        await EquipoService.actualizarEquipo(Number(id), req.body);
        res.json({ message: "Equipo actualizado" });
      }
    
      public async eliminarEquipo(req: Request, res: Response) {
        const { id } = req.params;
        await EquipoService.eliminarEquipo(Number(id));
        res.json({ message: "Equipo eliminado" });
      }
    }
    
    export default new EquipoController();
    