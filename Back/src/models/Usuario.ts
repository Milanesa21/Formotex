import { Model, DataTypes } from "sequelize";
import sequelize from "../database/databse";
import bcrypt from 'bcryptjs';


class Usuario extends Model {
    public id!: number;
    public username!: string; 
    public password!: string;
    public role!: ('empleado' | 'admin');

    public ComparePassword = async (password: string): Promise<boolean> => {
        return await bcrypt.compare(password, this.password);
    };
}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('empleado', 'admin'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'usuarios'
});

export default Usuario;