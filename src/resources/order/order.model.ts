import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  merchant: Types.ObjectId;
  product: Types.ObjectId;
  customerEmail: string;
  amount: number;
  downPayment: number;
  financedAmount: number;
  tenureMonths: number;
  status: "pending" | "approved" | "rejected";
}

const OrderSchema = new Schema<IOrder>(
  {
    merchant: { type: Schema.Types.ObjectId, ref: "Merchant", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    customerEmail: { type: String, required: true },

    amount: { type: Number, required: true },
    downPayment: { type: Number, required: true },
    financedAmount: { type: Number, required: true },
    tenureMonths: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Order = model<IOrder>("Order", OrderSchema);

export default Order;
