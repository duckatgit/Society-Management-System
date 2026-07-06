import { Response } from "express";
import Admin from "../../models/AdminSchema";
import { AuthRequest } from "../../middleware/verifyToken";

export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const adminId = req.user?.id;

    if (!adminId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
