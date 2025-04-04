import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
      default: null,
    },
    amountTotal: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      default: "inr",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "card",
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Payment = mongoose.model("Payment", paymentSchema);
