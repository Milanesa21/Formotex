import Grupo from "../models/Grupo";

class GrupoService {
    public async crearGrupo(data: any) {
        const nuevoGrupo = await Grupo.create(data);
        return nuevoGrupo;
    }

    public async obtenerGrupos() {
        return await Grupo.findAll();
    }

    public async eliminarGrupo(id: number) {
        return await Grupo.destroy({ where: { id } });
    }
}

export default new GrupoService();