import { IRoutes } from "./routes.interace";
import { MerchantRoute } from "./resources/merchant/merchant.route";
import { ProductRoute } from "./resources/product/product.route";
import { OrderRoute } from "./resources/order/order.route";

export const routes: IRoutes = [
  new MerchantRoute(),
  new ProductRoute(),
  new OrderRoute(),
];
