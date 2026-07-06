import mongoose, { Document } from "mongoose";

export interface IBuilding extends Document {
  societyId: string;
  name: string;
  towerCode: string;
  totalFloors: number;
  totalFlats: number;
  flatType: string;
  location: string;
  isActive: boolean;
}

const BuildingSchema = new mongoose.Schema(
  {
    societyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    towerCode: {
      type: String,
      required: true,
      unique: true,
    },
    totalFloors: {
      type: Number,
      required: true,
    },
    totalFlats: {
      type: Number,
      required: true,
    },
    flatType: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
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

const Building =
  mongoose.models.Building ||
  mongoose.model<IBuilding>("Building", BuildingSchema);

export default Building;
