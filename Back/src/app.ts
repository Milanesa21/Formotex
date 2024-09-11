import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import router from "./routes/auth";
import sequelize from "./database/databse";
import routers from "./routes/equipos";

interface Server {
  start(): void;
}

class App implements Server {
  private app: Application;

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
    this.app.use("/api/auth", router);
    this.app.use("/api/equipos", routers);
  }

  // Método para iniciar el servidor
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
