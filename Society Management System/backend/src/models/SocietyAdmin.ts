import mongoose, { Document } from "mongoose";

export interface ISocietyAdmin extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "society_admin";
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

const societyAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Admin email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Admin phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["society_admin"],
      default: "society_admin",
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.SocietyAdmin ||
  mongoose.model<ISocietyAdmin>("SocietyAdmin", societyAdminSchema);
