import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Society from "../../models/CreateSociety";
import SocietyAdmin from "../../models/SocietyAdmin";

const createSociety = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      name,
      registrationNumber,
      societyType,
      address,
      city,
      country,
      subscriptionPlan,
      adminName,
      adminEmail,
      adminPhone,
      password,
    } = req.body;

    // Validation
    if (
      !name ||
      !registrationNumber ||
      !societyType ||
      !address ||
      !city ||
      !country ||
      !subscriptionPlan ||
      !adminName ||
      !adminEmail ||
      !adminPhone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing records
    const existingAdmin = await SocietyAdmin.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin email already exists",
      });
    }

    const existingSociety = await Society.findOne({
      registrationNumber,
    });

    if (existingSociety) {
      return res.status(400).json({
        success: false,
        message: "Registration number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await SocietyAdmin.create({
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      password: hashedPassword,
      role: "society_admin",
    });

    // Create society
    const society = await Society.create({
      name,
      registrationNumber,
      societyType,
      address,
      city,
      country,
      subscriptionPlan,
      admin: admin._id,
    });

    const finalData = await Society.findById(society._id).populate("admin");

    return res.status(201).json({
      success: true,
      message: "Society created successfully",
      data: finalData,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default createSociety;
