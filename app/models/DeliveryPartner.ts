import mongoose, { Schema, Document, model, Types } from "mongoose";

export enum IsActive {
  Activate = "activate",
  DeActivate = "deativate",
  Pending = "pending",
}

export interface DeliveryPartner extends Document {
  user_id: Types.ObjectId;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  is_deleted: boolean;
  is_active: IsActive;
}

// Custom validator function to validate phone number
function validatePhoneNumber(value: string): boolean {
  const phoneNumberRegex = /^\d{10}$/; // Regular expression to match 10 digits
  return phoneNumberRegex.test(value);
}

export const DeliveryPartnerSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: validatePhoneNumber,
      message: "Phone number must be exactly 10 digits.",
    },
  },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
  is_active: {
    type: String,
    enum: Object.values(IsActive),
    default: IsActive.Pending,
  },
});
// Indexes
DeliveryPartnerSchema.index({ user_id: 1 });

export const DeliveryPartnerModel = mongoose.model<DeliveryPartner>(
  "DeliveryPartner",
  DeliveryPartnerSchema
);
