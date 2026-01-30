import { IRequest } from "../../utils/request";
import { Response } from "express";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.dto";
import { ResponseHandler } from "../../utils/responses";

export class OrderController {
  constructor(private readonly orderService: OrderService) {
    this.orderService = orderService;
  }

  createOrder = async (req: IRequest<CreateOrderDto>, res: Response) => {
    const merchantId = req.user?.id as string;

    const { productId, customerEmail, downPayment, tenureMonths } = req.body;

    const order = await this.orderService.createOrder(merchantId, {
      productId,
      customerEmail,
      downPayment,
      tenureMonths,
    });

    ResponseHandler.successResponse(
      res,
      "Order created successfully",
      order,
      201,
    );
  };

  findOrders = async (req: IRequest, res: Response) => {
    const merchantId = req.user?.id as string;
    const orders = await this.orderService.getOrders(merchantId);

    ResponseHandler.successResponse(
      res,
      "Orders fetched successfully",
      orders,
      200,
    );
  };

  findOrderById = async (req: IRequest, res: Response) => {
    const { id } = req.params;
    const merchantId = req.user?.id as string;
    const order = await this.orderService.getOrderById(id, merchantId);
    ResponseHandler.successResponse(
      res,
      "Order fetched successfully",
      order,
      200,
    );
  };
}
