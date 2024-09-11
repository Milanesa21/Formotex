import { Model, DataTypes } from "sequelize";
import sequelize from "../database/databse";

class Organizacion extends Model {
    public id!: number;
    public nombre!: string;
}

Organizacion.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    modelName: 'organizaciones'
});
export default Organizacion;