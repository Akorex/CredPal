import { CustomError } from "../../utils/custom-error";
import Product from "../product/product.model";
import mongoose from "mongoose";
import { CreateOrderDto } from "./order.dto";
import Order from "./order.model";

export class OrderService {
  public async createOrder(merchantId: string, data: CreateOrderDto) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const product = await Product.findOne({
        _id: data.productId,
        merchant: merchantId,
      }).session(session);

      if (!product) throw CustomError.NotFound("Product not found");

      if (product.stock <= 0) {
        throw CustomError.BadRequest("Product is out of stock");
      }

      if (!product.creditConfig.enabled) {
        throw CustomError.BadRequest("This product is not eligible for credit");
      }
      const amount = product.price;
      const minRequired = (amount * product.creditConfig.minDownPayment) / 100;

      if (data.downPayment < minRequired) {
        throw CustomError.BadRequest(
          `Down payment too low. Min: ${minRequired}`,
        );
      }

      const financedAmount = amount - data.downPayment;
      const [order] = await Order.create(
        [
          {
            merchant: merchantId,
            product: data.productId,
            customerEmail: data.customerEmail,
            amount,
            downPayment: data.downPayment,
            financedAmount,
            tenureMonths: data.tenureMonths,
            status: "approved",
          },
        ],
        { session },
      );

      await Product.updateOne(
        { _id: product._id },
        { $inc: { stock: -1 } },
      ).session(session);

      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
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
