import { CustomError } from "../../utils/custom-error";
import Product from "../product/product.model";
import { CreateOrderDto } from "./order.dto";
import Order from "./order.model";

export class OrderService {
  public async createOrder(merchantId: string, data: CreateOrderDto) {
    const product = await Product.findOne({
      _id: data.productId,
      merchant: merchantId,
    });

    // CHECK 1: Existence
    if (!product) {
      throw CustomError.NotFound("Product not found in your inventory");
    }

    // CHECK 2: Stock
    if (product.stock <= 0) {
      throw CustomError.BadRequest("Product is out of stock");
    }

    const amount = product.price;

    if (!product.creditConfig.enabled) {
      throw CustomError.BadRequest("This product is not eligible for credit");
    }

    const minRequired = (amount * product.creditConfig.minDownPayment) / 100;

    if (data.downPayment < minRequired) {
      throw CustomError.BadRequest(
        `Down payment too low. Minimum ${product.creditConfig.minDownPayment}% (${minRequired}) required.`,
      );
    }

    if (data.downPayment > amount) {
      throw CustomError.BadRequest(
        "Down payment cannot be greater than the product price",
      );
    }

    const financedAmount = amount - data.downPayment;

    const order = await Order.create({
      merchant: merchantId,
      product: data.productId,
      customerEmail: data.customerEmail,
      amount,
      downPayment: data.downPayment,
      financedAmount,
      tenureMonths: data.tenureMonths,
      status: "approved", //autoapprove for now
    });

    product.stock -= 1;
    await product.save();

    return order;
  }

  public async getOrders(merchantId: string) {
    return await Order.find({ merchant: merchantId })
      .populate("product", "name sku price")
      .sort({ createdAt: -1 });
  }

  public async getOrderById(orderId: string, merchantId: string) {
    const order = await Order.findOne({
      _id: orderId,
      merchant: merchantId,
    }).populate("product", "name sku price");

    if (!order) {
      throw CustomError.NotFound("Order not found");
    }

    return order;
  }
}
