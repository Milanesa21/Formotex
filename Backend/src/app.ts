import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import sequelize from "./database/databse";
import { authRoutes } from "./routes/UsuarioRoutes";
import { equipoRoutes } from "./routes/equipos";
import { organizacionRoutes } from "./routes/organizationsRoutes";
import { grupoRoutes } from "./routes/grupos";


// Interfaz para definir un servidor
interface Server {
  start(): void;
}

class App implements Server {
  private app: Application;


  // Inicializar express
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  // Configurar middlewares
  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  // Configurar rutas
  private routes(): void {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/equipos", equipoRoutes);
    this.app.use("/api/", organizacionRoutes)
    this.app.use("/api/grupos", grupoRoutes);

  }

  // Iniciar el servidor
  public async start(): Promise<void> {
    try {
      await sequelize.sync({ force: false });
      const PORT = process.env.PORT;
      this.app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
      });
    } catch (error) {
      console.error("Error al iniciar la base de datos:", error);
    }
  }
}

// Iniciar la aplicación
const app = new App();
app.start();
