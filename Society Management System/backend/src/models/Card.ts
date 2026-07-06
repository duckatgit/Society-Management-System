import { timeStamp } from "console";
import mongoose, { models } from "mongoose";
import { title } from "process";

export interface ICard extends Document {
  type: "dashboard_card" | "society_card";
  title: string;
  value: string;
  percentage: string;
  icon: string;
}
const cardSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["dashboard_card", "society_card"],
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate titles within the same type
cardSchema.index({ type: 1, title: 1 }, { unique: true });

export default mongoose.model<ICard>("Card", cardSchema);
