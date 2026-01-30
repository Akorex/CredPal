import { IRequest } from "../../utils/request";
import { Response } from "express";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./product.dto";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //   async createProduct(req: IRequest<CreateProductDto>, res: Response) {
  //     const { name, description, price, stock, creditConfig, sku } = req.body;
  //     const merchant = req.user?.id;

  //     const product = await this.productService.createProduct({
  //       name,
  //       description,
  //       price,
  //       stock,
  //       creditConfig,
  //       sku,
  //       merchant,
  //     });
  //     return res.status(201).json({ success: true, data: product });
  //   }

  async findProducts(req: IRequest, res: Response) {
    const products = await this.productService.findProducts();
    return res.status(200).json({ success: true, data: products });
  }

  async findProductById(
    req: IRequest<unknown, unknown, { id: string }>,
    res: Response,
  ) {
    const { id } = req.params;
    const product = await this.productService.findProductById(id);
    return res.status(200).json({ success: true, data: product });
  }
}
