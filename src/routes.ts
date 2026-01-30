import { IRoutes } from "./routes.interace";
import { MerchantRoute } from "./resources/merchant/merchant.route";

export const routes: IRoutes = [new MerchantRoute()];
