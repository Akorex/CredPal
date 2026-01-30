import { Router } from "express";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { verifyToken } from "../../utils/auth";
import { wrapService, wrapController } from "../../utils/wrappers";

export class OrderRoute {
  public router = Router();
  private orderService = wrapService(new OrderService());
  private orderController = wrapController(
    new OrderController(this.orderService),
  );

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.post("/orders", verifyToken, this.orderController.createOrder);
    this.router.get("/orders", verifyToken, this.orderController.findOrders);
    this.router.get(
      "/orders/:id",
      verifyToken,
      this.orderController.findOrderById,
    );
  }
}
