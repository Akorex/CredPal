import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  merchant: Types.ObjectId;
  name: string;
  sku: string;
  price: number;
  stock: number;
  description: string;
  creditConfig: {
    enabled: boolean;
    minDownPayment: number;
    interestRate: number;
  };
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sku: { type: String, required: true },
    merchant: { type: Schema.Types.ObjectId, ref: "Merchant", required: true },
    creditConfig: {
      enabled: { type: Boolean, default: false },
      minDownPayment: { type: Number, default: 20 },
      interestRate: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
