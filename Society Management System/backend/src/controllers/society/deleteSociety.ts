import Society from "../../models/CreateSociety";
import { Request, Response } from "express";

export const deleteSociety = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const society = await Society.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: "after" },
    );

    if (!society) {
      res.status(404).json({
        success: false,
        message: "Society not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Society deleted successfully",
      data: society,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
