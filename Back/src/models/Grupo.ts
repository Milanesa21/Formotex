import { Model, DataTypes, STRING } from "sequelize";
import sequelize from "../database/databse";
import Organizacion from "./Organizacion";

class Grupo extends Model {
    public id!: number;
    public nombre!: string;
    public organizacionId!: number;
}

Grupo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: STRING,
        allowNull: false
    },
    organizacionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Organizacion,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'grupos'
});

Grupo.belongsTo(Organizacion,{ foreignKey: 'organizacionId' });

export default Grupo;