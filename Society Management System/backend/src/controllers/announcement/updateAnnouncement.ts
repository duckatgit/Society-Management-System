import { Request, Response } from "express";
import Announcement from "../../models/CreateAnnouncement";

export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, societies, publishDate, status } =
      req.body;

    const announce = await Announcement.findByIdAndUpdate(
      id,
      {
        title,
        description,
        priority,
        societies,
        publishDate,
        status,
      },
      { returnDocument: "after" },
    );
    if (!announce) {
      return res.status(401).json({ message: "announcement not found " });
    }
    return res.status(200).json({
      message: "announcement updated succesfully",
      data: announce,
    });
  } catch {
    return res.status(500).json({ message: "server error" });
  }
};
