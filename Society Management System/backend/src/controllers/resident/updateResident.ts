import Resident from "../../models/Resident";
import { Request, Response } from "express";

export const updateResident = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resident = await Resident.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resident updated successfully",
      data: resident,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
