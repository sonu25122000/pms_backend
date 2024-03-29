import mongoose, { model, Schema } from "mongoose";

export interface SuperAdminDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  is_active: boolean;
  resetToken: string | null;
}

export const SuperAdminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, required: true, default: true },
    resetToken: { type: String, require: true, default: null },
  },
  { timestamps: true }
);

const SuperAdmin = mongoose.model<SuperAdminDocument>(
  "SuperAdmin",
  SuperAdminSchema
);

export default SuperAdmin;
