import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { where } from "sequelize";

export const register = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({ username, password: hashedPassword, role});

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json(error);
    }
    
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try{
        const user = await Usuario.findOne({ where: {username} });

        if (!user || !(await user.ComparePassword(password))) {
            return res.status(401).json({ message: 'Credenciales incorrectas'});
        }

        const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT as string, {expiresIn: '1h'});

        return res.status(200).json({token});
    } catch (error) {
        return res.status(500).json(error);
    }
};