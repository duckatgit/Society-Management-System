import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  description: string;
  category: "Maintenance" | "Event" | "Meeting" | "General Notice";
  priority: "Low" | "Medium" | "High" | "Critical";
  sendTo: string[];
  societies: mongoose.Types.ObjectId[];
  publishDate?: Date;
  expiryDate?: Date;
  isPinned: boolean;
  attachmentUrl?: string;
  status: "Draft" | "Published";
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
}

const AnnouncementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Maintenance", "Event", "Meeting", "General Notice"],
      default: "General Notice",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    // Multiple Roles
    sendTo: [
      {
        type: String,
        enum: [
          "Resident",
          "Owner",
          "Tenant",
          "Society Admin",
          "Committee Member",
          "Security Guard",
          "Maintenance Staff",
        ],
      },
    ],

    // Multiple Societies
    societies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Society",
      },
    ],

    publishDate: Date,

    expiryDate: Date,

    isPinned: {
      type: Boolean,
      default: false,
    },

    attachmentUrl: String,

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export default mongoose.model("Announcement", AnnouncementSchema);
