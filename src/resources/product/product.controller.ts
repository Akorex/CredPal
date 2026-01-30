import { IRequest } from "../../utils/request";
import { Response } from "express";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./product.dto";
import { ResponseHandler } from "../../utils/responses";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  createProduct = async (req: IRequest<CreateProductDto>, res: Response) => {
    const { name, description, price, stock, creditConfig, sku } = req.body;
    const merchantId = req.user?.id as string;

    const product = await this.productService.createProduct(merchantId, {
      name,
      description,
      price,
      stock,
      creditConfig,
      sku,
    });

    ResponseHandler.successResponse(
      res,
      "Product created successfully",
      product,
      201,
    );
  };

  findProducts = async (req: IRequest, res: Response) => {
    const merchantId = req.user?.id as string;
    const products = await this.productService.findProducts(merchantId);

    ResponseHandler.successResponse(
      res,
      "Products fetched successfully",
      products,
      200,
    );
  };

  findProductById = async (
    req: IRequest<unknown, unknown, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    const merchantId = req.user?.id as string;
    const product = await this.productService.findProductById(id, merchantId);

    ResponseHandler.successResponse(
      res,
      "Product fetched successfully",
      product,
      200,
    );
  };
}
