import mongoose, { Document, Schema } from "mongoose";

export interface variantOptionDocument extends Document {
  value: string;
  order: number;
  isVisibility?: boolean;
}

const VariantOptionSchema = new mongoose.Schema(
  {
    value: { type: String, require: true },
    order: { type: Number, require: true },
    isVisibility: { type: Boolean, require: true, default: true },
  },
  { timestamps: true }
);

const VariantOption = mongoose.model<variantOptionDocument>(
  "VariantOption",
  VariantOptionSchema
);

export default VariantOption;
