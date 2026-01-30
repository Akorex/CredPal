import { CustomError } from "../../utils/custom-error";
import { CreateProductDto } from "./product.dto";
import Product from "./product.model";

export class ProductService {
  async createProduct(merchantId: string, product: CreateProductDto) {
    const existing = await Product.findOne({
      sku: product.sku,
      merchant: merchantId,
    });

    if (existing) {
      throw CustomError.BadRequest("Product already exists");
    }

    return await Product.create({ ...product, merchant: merchantId });
  }

  async findProducts(merchantId: string) {
    return await Product.find({ merchant: merchantId });
  }

  async findProductById(id: string, merchantId: string) {
    const product = await Product.findOne({ _id: id, merchant: merchantId });
    if (!product) {
      throw CustomError.NotFound("Product not found");
    }
    return product;
  }
}
