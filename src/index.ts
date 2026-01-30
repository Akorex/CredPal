import express from "express";
import { Express } from "express";
import cors from "cors";
import { DATABASE_URL } from "./config/env";
import mongoose from "mongoose";
import { IRoutes } from "./routes.interace";
import { errorHandler, notFoundHandler } from "./middlewares/errorhandler";

class App {
  public app: Express;

  constructor(routes: IRoutes) {
    this.app = express();
    this.initDB();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.initRoutes(routes);
    this.initMiddlewares();
    this.app.use(cors());
  }

  public getApp() {
    return this.app;
  }

  private initMiddlewares() {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  private initRoutes(routes: IRoutes) {
    routes.forEach((route) => {
      this.app.use(`/api/v1`, route.router);
    });
  }

  private async initDB() {
    try {
      await mongoose.connect(DATABASE_URL);
      console.log("Database connection established");
    } catch (error) {
      console.log("Database connection failed");
      console.error(error);
      process.exit(1);
    }
  }
}

export default App;
