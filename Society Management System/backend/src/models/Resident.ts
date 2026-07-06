import mongoose, { Schema, Document, Types } from "mongoose";

export interface IResident extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;

  societyId: Types.ObjectId;
  buildingId: Types.ObjectId;

  unit: string;
  role: "owner" | "tenant";

  isActive: boolean;
  status: "Active" | "Inactive";

  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

const residentSchema = new Schema<IResident>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    societyId: {
      type: Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },

    buildingId: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["owner", "tenant"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    emergencyContact: {
      name: {
        type: String,
        required: true,
      },

      relation: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Resident ||
  mongoose.model<IResident>("Resident", residentSchema);
