import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userid: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productid: {
          type:mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
