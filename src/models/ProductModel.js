import mongoose from "mongoose";

export default mongoose.model(
  "productDB",
  mongoose.Schema({
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    stockQuantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryDB",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  })
);
