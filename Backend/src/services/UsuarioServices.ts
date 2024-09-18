import Usuario from "../models/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UsuarioServices {
  // Crear usuario con hash de contraseña
  public async createUsuario(username: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      username,
      password: hashedPassword,
      role,
    });
    return nuevoUsuario;
  }

  // Autenticar usuario y generar token
  public async autenticarUsuario(username: string, password: string) {
    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario) throw new Error("Usuario no encontrado");

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return token;
  }

  // Obtener todos los usuarios
  public async obtenerUsuarios() {
    return await Usuario.findAll();
  }

  // Eliminar usuario por ID
  public async eliminarUsuario(id: number) {
    return await Usuario.destroy({ where: { id } });
  }

  // Actualizar usuario: username o role
  public async actualizarUsuario(
    id: number,
    data: { username?: string; role?: "empleado" | "admin" }
  ) {
    const usuario = await Usuario.findByPk(id); // Buscar usuario por ID
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizar solo los campos enviados
    if (data.username) {
      usuario.username = data.username;
    }
    if (data.role) {
      usuario.role = data.role as "empleado" | "admin";
    }

    await usuario.save(); // Guardar cambios en la base de datos
    return usuario; // Retornar el usuario actualizado
  }

  // Obtener usuario por ID
  public async obtenerUsuarioPorId(id: number) {
    return await Usuario.findByPk(id); // Buscar usuario por ID
  }
}

export default new UsuarioServices();
