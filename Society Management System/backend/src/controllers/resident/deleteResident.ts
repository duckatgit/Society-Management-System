import Resident from "../../models/Resident";

import { Request, Response } from "express";

export const deleteResident = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resident = await Resident.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { returnDocument: "after" },
    );

    if (!resident) {
      return res.status(401).json({
        success: false,
        message: "Resident not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Society deleted successfully",
      data: resident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
