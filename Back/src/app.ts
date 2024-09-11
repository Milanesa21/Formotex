import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import sequelize from "./database/databse";
/*import authRoutes from "./routes/auth";
import equipoRoutes from "./routes/equipos";
import { organizacionRoutes } from "./routes/organizationsRoutes";
import { grupoRoutes } from "./routes/grupos";*/

interface Server {
  start(): void;
}

class App implements Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    //this.routes();
  }

  // Configurar middlewares
  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  // Configurar rutas
  /*private routes(): void {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/equipos", equipoRoutes);
    this.app.use("/api/", organizacionRoutes)
    this.app.use("/api/", grupoRoutes)
  }*/

  
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

const app = new App();
app.start();
