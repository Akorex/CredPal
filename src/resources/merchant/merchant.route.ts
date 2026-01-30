import { MerchantController } from "./merchant.controller";
import { Router } from "express";
import { MerchantService } from "./merchant.service";
import { wrapController, wrapService } from "../../utils/wrappers";

export class MerchantRoute {
  public path = "/merchants";
  private merchantService = wrapService(new MerchantService());

  private merchantController = wrapController(
    new MerchantController(this.merchantService),
  );
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(`${this.path}/register`, this.merchantController.register);
    this.router.post(`${this.path}/login`, this.merchantController.login);
  }
}
