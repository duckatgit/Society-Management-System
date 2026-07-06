import mongoose, { Schema, Document } from "mongoose";

export interface ISociety extends Document {
  name: string;
  registrationNumber: string;
  societyType: string;
  address: string;
  city: string;
  country: string;
  subscriptionPlan: string;
  admin: mongoose.Types.ObjectId;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SocietySchema = new Schema<ISociety>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    societyType: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
      trim: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "SocietyAdmin",
      required: true,
    },
    role: {
      type: String,
      enum: ["society_admin", "super_admin"],
      default: "society_admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ISociety>("Society", SocietySchema);
