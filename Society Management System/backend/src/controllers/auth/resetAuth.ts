import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Admin from "../../models/AdminSchema";
import SocietyAdmin from "../../models/SocietyAdmin";

const resetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // 1. Validate input
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    let user: any = null;
    let role = "";

    // 2. Check Super Admin collection
    user = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (user) {
      role = "super-admin";
    }

    // 3. Check Society Admin collection if not found in Super Admin
    if (!user) {
      user = await SocietyAdmin.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: new Date() },
      });

      if (user) {
        role = "society-admin";
      }
    }

    // 4. Handle invalid or expired token
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 5. Explicitly hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `${role} password reset successfully`,
    });
  } catch (error: any) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default resetPassword;
