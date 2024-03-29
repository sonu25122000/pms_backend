import mongoose, { model, Schema } from 'mongoose';
import validator from 'validator'

export enum UserRole {
  VENDOR = 'vendor',
  DELIVERY_PARTNER = 'delivery_partner',
}

export interface UserDocument extends mongoose.Document {    
    email: string;
    username: string;
    password: string;
    role?: UserRole | null;
    resetToken:string | null;
    is_active:boolean;
}

export const UserSchema = new mongoose.Schema(
  {

    email: {
        type: String, required: true,
        unique:true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Invalid email address',
          },
      
    },
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: String, enum: Object.values(UserRole), default: null },
    resetToken:{type:String,default:null},
    is_active: {type: Boolean, default: true}
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;