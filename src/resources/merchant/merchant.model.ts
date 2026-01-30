import { Schema, model, Document } from "mongoose";

export interface IMerchant extends Document {
  businessName: string;
  email: string;
  password: string;
  apiKey: string; // for partner integration
}

const MerchantSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
  },
  { timestamps: true },
);

const Merchant = model<IMerchant>("Merchant", MerchantSchema);

export default Merchant;
