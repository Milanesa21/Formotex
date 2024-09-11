import EquipoInformatico from "../models/EquipoInformatico";

class EquipoService {
    public async crearEquipo(data: any) {
        const nuevoEquipo = await EquipoInformatico.create(data);
        return nuevoEquipo;
    }

    public async obtenerEquipos() {
        return await EquipoInformatico.findAll();
    }

    public async obtenerEquipo(id: number) {
        return await EquipoInformatico.findByPk(id);
    }

    public async actualizarEquipo(id: number, data: any) {
        await EquipoInformatico.update(data, { where: { id } });
        return await EquipoInformatico.findByPk(id);
    }

    public async eliminarEquipo(id: number) {
        return await EquipoInformatico.destroy({ where: { id } });
    }
}

export default new EquipoService();