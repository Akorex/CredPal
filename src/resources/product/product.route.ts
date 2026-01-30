import { Router } from "express";
import { wrapService, wrapController } from "../../utils/wrappers";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { verifyToken } from "../../utils/auth";
import { CreateProductDto } from "./product.dto";
import validationMiddleware from "../../middlewares/validator";

export class ProductRoute {
  public router = Router();
  public path = "/products";

  private productService = wrapService(new ProductService());
  private productController = wrapController(
    new ProductController(this.productService),
  );

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      verifyToken,
      validationMiddleware(CreateProductDto),
      this.productController.createProduct,
    );
    this.router.get(
      `${this.path}`,
      verifyToken,
      this.productController.findProducts,
    );
    this.router.get(
      `${this.path}/:id`,
      verifyToken,
      this.productController.findProductById,
    );
  }
}
