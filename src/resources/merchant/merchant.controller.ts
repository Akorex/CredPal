import { Response } from "express";
import { IRequest } from "../../utils/request";
import { CreateMerchantDto, LoginMerchantDto } from "./merchant.dto";
import { MerchantService } from "./merchant.service";
import { ResponseHandler } from "../../utils/responses";

export class MerchantController {
  constructor(private readonly merchantSv: MerchantService) {
    this.merchantSv = merchantSv;
  }

  public register = async (req: IRequest<CreateMerchantDto>, res: Response) => {
    const { businessName, email, password } = req.body;

    const merchant = await this.merchantSv.createMerchant(
      businessName,
      email,
      password,
    );

    ResponseHandler.successResponse(
      res,
      "Merchant created successfully",
      merchant,
      201,
    );
  };

  public login = async (req: IRequest<LoginMerchantDto>, res: Response) => {
    const { email, password } = req.body;

    const { token, merchant } = await this.merchantSv.loginMerchant(
      email,
      password,
    );

    ResponseHandler.successResponse(
      res,
      "Login successful",
      {
        token,
        merchant,
      },
      200,
    );
  };
}
