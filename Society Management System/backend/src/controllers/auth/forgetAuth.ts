import crypto from "crypto";
import nodemailer from "nodemailer";
import { Request, Response } from "express";

import Admin from "../../models/AdminSchema";
import SocietyAdmin from "../../models/SocietyAdmin";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    let user = null;
    let resetLink = "";

    // Check Super Admin
    user = await Admin.findOne({ email });

    if (user) {
      resetLink = `http://localhost:5173/super-admin/reset/${crypto
        .randomBytes(32)
        .toString("hex")}`;
    } else {
      // Check Society Admin
      user = await SocietyAdmin.findOne({ email });

      if (user) {
        resetLink = `http://localhost:5173/society-admin/reset/${crypto
          .randomBytes(32)
          .toString("hex")}`;
      }
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Extract token from the URL
    const resetToken = resetLink.split("/").pop()!;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>Reset Password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Reset link sent successfully.",
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
