import { CreateProductDto } from "./product.dto";
import Product from "./product.model";

export class ProductService {
  async createProduct(product: CreateProductDto, merchant: string) {
    return await Product.create({ ...product, merchant });
  }

  async findProducts() {
    return await Product.find();
  }

  async findProductById(id: string) {
    return await Product.findById(id);
  }
}
