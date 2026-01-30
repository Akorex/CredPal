import Merchant from "./merchant.model";
import { IMerchant } from "./merchant.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken } from "../../utils/auth";
import { CustomError } from "../../utils/custom-error";

export class MerchantService {
  constructor() {}

  public async createMerchant(
    businessName: string,
    email: string,
    passwordPlain: string,
  ): Promise<IMerchant> {
    const existing = await this.getMerchantByEmail(email);
    if (existing) {
      throw CustomError.BadRequest("Merchant already exists");
    }

    const hashedPassword = await bcrypt.hash(passwordPlain, 10);
    const apiKey = "sk_live_" + crypto.randomBytes(12).toString("hex");

    const merchant = await Merchant.create({
      businessName,
      email,
      password: hashedPassword,
      apiKey,
    });

    // sensitive fields
    merchant.password = undefined as any;
    merchant.apiKey = undefined as any;

    return merchant;
  }

  public async loginMerchant(email: string, password: string) {
    const merchant = await Merchant.findOne({ email }).select("+password");

    if (!merchant) {
      throw CustomError.Unauthorized("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, merchant.password);
    if (!isMatch) {
      throw CustomError.Unauthorized("Invalid email or password");
    }

    const token = generateAccessToken(merchant._id.toString());

    merchant.password = undefined as any;

    return { token, merchant };
  }

  public async getMerchantById(id: string) {
    const merchant = await Merchant.findById(id);
    return merchant;
  }

  public async getMerchantByEmail(email: string) {
    const merchant = await Merchant.findOne({ email });
    return merchant;
  }

  public async updateMerchant(id: string, merchantData: IMerchant) {
    const merchant = await Merchant.findByIdAndUpdate(id, merchantData);
    return merchant;
  }

  public async deleteMerchant(id: string) {
    const merchant = await Merchant.findByIdAndDelete(id);
    return merchant;
  }
}
