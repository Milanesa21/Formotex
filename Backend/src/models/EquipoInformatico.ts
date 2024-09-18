import {Model, DataTypes, INET} from "sequelize";
import sequelize from "../database/databse";
import Grupo from "./Grupo";


class EquipoInformatico extends Model {
    public id!: number;
    public nombre!: string;
    public estado!: string;
    public ubicacion!: string;
    public fechaAdquisicion!: Date;
    public grupoId!: number;
}

EquipoInformatico.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grupoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Grupo,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'equipos_informaticos'
});

EquipoInformatico.belongsTo(Grupo, {foreignKey: 'grupoId'});

export default EquipoInformatico;