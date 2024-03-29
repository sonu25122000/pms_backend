import mongoose, { Document, Schema } from "mongoose";
import VariantOption from "./VariantOption";
export enum DisplayInFilter {
  YES = "YES",
  NO = "NO",
}
export interface IProductVariant extends Document {
  product_variant: string;
  display_in_filter?: DisplayInFilter;
  variant_type: string;
  isVisibility?: boolean;
  order: number;
  option_value: mongoose.Types.ObjectId[];
}

const ProductVariantSchema = new mongoose.Schema({
  product_variant: { type: String, require: true },
  display_in_filter: { type: String, enum: Object.values(DisplayInFilter),require:true,default:DisplayInFilter.YES },
  variant_type: { type: String, require: true },
  isVisibility: { type: Boolean, require: true, default: true },
  order: { type: Number, require: true, default: 0 },
  option_value: [{ type: Schema.Types.ObjectId, ref: "VariantOption" }],
});


const ProductVariant = mongoose.model<IProductVariant>('ProductVariant',ProductVariantSchema)

export default ProductVariant;