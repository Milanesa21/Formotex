import Usuario from "../models/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UsuarioServices {
    public async createUsuario(username: string, password: string, role:string ) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({
            username,
            password: hashedPassword,
            role
        });
        return nuevoUsuario;
        }

        public async autenticarUsuario(username: string, password: string) {
            const usuario = await Usuario.findOne({ where: {username} });
            if (!usuario) throw new Error('Usuario no encontrado');


            const esValido = await bcrypt.compare(password, usuario.password);
            if (!esValido) throw new Error('Contraseña incorrecta');

            const token = jwt.sign(
                { id: usuario.id, role: usuario.role},
                process.env.JWT_SECRET as string,
                { expiresIn: '1h'}
            );
            return token;
        }

        public async obtenerUsuarios() {
            return await Usuario.findAll();
        }

        public async eliminarUsuario(id: number) {
            return await Usuario.destroy({ where: {id} });
        }
    }

    export default new UsuarioServices();