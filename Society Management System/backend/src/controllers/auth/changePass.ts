// controllers/adminController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Admin from "../../models/AdminSchema";

export const changeAdminPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Fallback-safe tracking to catch whatever property your auth middleware uses
    const reqAny = req as any;
    const adminId =
      reqAny.user?.id ||
      reqAny.user?._id ||
      reqAny.admin?.id ||
      reqAny.admin?._id ||
      reqAny.auth?.id ||
      reqAny.auth?._id;

    if (!adminId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized. Missing user session or unmapped auth context.",
      });
      return;
    }

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Both current and new passwords are required.",
      });
      return;
    }

    // 2. Locate the admin record in the collection
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({
        success: false,
        message: "Administrative account not found.",
      });
      return;
    }

    // 3. Verify current password matches the one stored in database
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "The current password you entered is incorrect.",
      });
      return;
    }

    // 4. Prevent reusing the same password
    const isSame = await bcrypt.compare(newPassword, admin.password);
    if (isSame) {
      res.status(400).json({
        success: false,
        message: "New password cannot be identical to your current password.",
      });
      return;
    }

    // 5. Assign the plain text password.
    // Your AdminSchema.pre('save') hook will catch this and hash it safely!
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error: any) {
    console.error("Password update tracking failure:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during password rotation.",
    });
  }
};
