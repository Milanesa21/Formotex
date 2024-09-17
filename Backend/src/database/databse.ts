import { Sequelize, Dialect } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();    

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: process.env.DB_DRIVER as Dialect,
        port: Number(process.env.DB_PORT)
    }
)

export default sequelize;