import Admin from "../../models/AdminSchema";
import { Request, Response } from "express";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const adminId = req.user?.id;
    if (!adminId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { name, email, phone } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email, phone },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: admin,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Profile update failed",
    });
    return;
  }
};
