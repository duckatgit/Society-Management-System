import Announcement from "../../models/CreateAnnouncement";
import { Request, Response } from "express";

export const deleteAnnounce = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { isActive: false },
      { returnDocument: "after" },
    );
    if (!announcement) {
      res.status(401).json({
        success: false,
        message: "Announcement not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
