import mongoose from "mongoose";

export default mongoose.model(
  "Category",
  mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
        unique: true,
      },
      quantity: {
        type: Number,
        default: 0,
        min: 0,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);
