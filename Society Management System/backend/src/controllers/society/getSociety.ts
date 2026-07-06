import { AuthRequest } from "../../middleware/verifyToken";
import Society from "../../models/CreateSociety";
import { Request, Response } from "express";

export const getSociety = async (req: AuthRequest, res: Response) => {
  try {
    let society: any;
    const user = req.user;

    if (user?.role === "super_admin") {
      society = await Society.find({ isActive: true }).populate("admin");
    } else if (user?.role === "society_admin") {
      society = await Society.findOne({
        admin: req?.user?.id,
      }).populate("admin");
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      count: society.length,
      data: society,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch societies",
    });
  }
};
