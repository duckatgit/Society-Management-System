import Building from "../../models/BuildingSchema";

import { Request, Response } from "express";

export const getBuilding = async (req: Request, res: Response) => {
  try {
    const building = await Building.find({ isActive: true });

    return res.status(200).json({
      success: true,
      count: building.length,
      data: building,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch building",
      error,
    });
  }
};
