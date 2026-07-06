import Building from "../../models/BuildingSchema";
import { Request, Response } from "express";

export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, towerCode, totalFloors, totalFlats, location } = req.body;

    const building = await Building.findByIdAndUpdate(
      id,
      {
        name,
        towerCode,
        totalFloors,
        totalFlats,
        location,
      },
      { returnDocument: "after" },
    );
    if (!building) {
      return res.status(401).json({
        message: "building not found",
        data: building,
      });
    }
    return res.status(201).json({ message: "update successfully" });
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};
