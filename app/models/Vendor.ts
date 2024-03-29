import mongoose, { Schema, Types } from "mongoose";

export enum IsActive {
  Activate = "activate",
  DeActivate = "deativate",
  Pending = "pending",
}

export interface VendorDocument extends mongoose.Document {
  user_id: Types.ObjectId;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  isDeleted: boolean;
  is_active: IsActive;
}

export const VendorSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: {
    type: String,
    required: true,
  },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  is_active: {
    type: String,
    enum: Object.values(IsActive),
    default: IsActive.Pending,
  },
});

const Vendor = mongoose.model<VendorDocument>("Vendor", VendorSchema);

export default Vendor;
