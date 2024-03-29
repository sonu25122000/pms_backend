import mongoose from "mongoose";

export interface BrandDocument extends mongoose.Document {
  name: string;
  description: string;
  logo_url: string;
  isVisible: Boolean;
}

export const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo_url: { type: String, required: true },
    isVisible: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Brand = mongoose.model<BrandDocument>("Brand", BrandSchema);

export default Brand;
