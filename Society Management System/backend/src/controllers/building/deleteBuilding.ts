import Building from "../../models/BuildingSchema";
import { Request, Response } from "express";

export const deleteBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const building = await Building.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: "after" },
    );

    if (!building) {
      return res.status(404).json({
        success: false,
        message: "Building not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Building deleted successfully",
      data: building,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
