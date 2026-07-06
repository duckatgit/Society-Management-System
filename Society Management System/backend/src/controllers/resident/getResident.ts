import { Request, Response } from "express";
import Resident from "../../models/Resident";

export const getResident = async (req: Request, res: Response) => {
  try {
    const resident = await Resident.find({ isActive: true });

    return res.status(200).json({
      success: true,
      count: resident.length,
      data: resident,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resident",
      error,
    });
  }
};
