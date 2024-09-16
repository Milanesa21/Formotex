import Organizacion from "../models/Organizacion";

class OrganizacionService {
    public async crearOrganizacion(data: any) {
        const nuevaOrganizacion = await Organizacion.create(data);
        return nuevaOrganizacion;
    }

    public async obtenerOrganizaciones() {
        return await Organizacion.findAll();
    }

    public async eliminarOrganizacion(id: number) {
        return await Organizacion.destroy({ where: { id } });
    }
}

export default new OrganizacionService();