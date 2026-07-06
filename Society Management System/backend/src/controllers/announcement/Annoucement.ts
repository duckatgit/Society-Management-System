import { Request, Response } from "express";
import Announcement from "../../models/CreateAnnouncement";

export const createAnnouncement = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      title,
      description,
      category,
      priority,
      sendTo,
      societies,
      publishDate,
      expiryDate,
      isPinned,
      status,
      attachmentUrl,
      createdBy,
    } = req.body;

    if (!title || !description || !createdBy) {
      res.status(400).json({
        success: false,
        message: "Title, description and createdBy are required.",
      });
      return;
    }

    if (!Array.isArray(sendTo) || sendTo.length === 0) {
      res.status(400).json({
        success: false,
        message: "Please select at least one role.",
      });
      return;
    }

    if (!Array.isArray(societies) || societies.length === 0) {
      res.status(400).json({
        success: false,
        message: "Please select at least one society.",
      });
      return;
    }

    const announcement = await Announcement.create({
      title,
      description,
      category,
      priority,
      sendTo,
      societies,
      publishDate,
      expiryDate,
      isPinned,
      status,
      attachmentUrl,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully.",
      data: announcement,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
