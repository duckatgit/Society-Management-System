import Announcement from "../../models/CreateAnnouncement";
import { Request, Response } from "express";

export const getAnnoucement = async (req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find({ isActive: true });

    return res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
      error,
    });
  }
};
