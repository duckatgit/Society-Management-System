import { AuthRequest } from "../../middleware/verifyToken";
import Building from "../../models/BuildingSchema";
import Society from "../../models/CreateSociety";
import { Response } from "express";

export const CreateBuilding = async (
  req: AuthRequest,
  res: Response,
): Promise<any> => {
  try {
    const {
      societyId,
      name,
      towerCode,
      totalFloors,
      totalFlats,
      flatType,
      location,
    } = req.body;

    if (
      !societyId ||
      !name ||
      !towerCode ||
      totalFloors == null ||
      totalFlats == null ||
      !flatType
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    const society = await Society.findById(societyId);

    if (!society) {
      return res.status(404).json({
        message: "Society not found",
      });
    }

    const existingBuilding = await Building.findOne({
      towerCode,
      isActive: true,
    });

    if (existingBuilding) {
      return res.status(409).json({
        message: "Building already exists",
      });
    }

    const createdBuilding = await Building.create({
      societyId: society._id,
      name,
      towerCode,
      totalFloors,
      totalFlats,
      flatType,
      location,
    });

    return res.status(201).json({
      success: true,
      message: "Building created successfully",
      data: createdBuilding,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};
