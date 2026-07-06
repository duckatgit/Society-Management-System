import { Request, Response } from "express";
import bcrypt from "bcrypt";

import Resident from "../../models/Resident";
import Society from "../../models/CreateSociety";
import Building from "../../models/BuildingSchema";

export const createResident = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      avatar,
      societyId,
      buildingId,
      unit,
      role,
      emergencyContact,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !societyId ||
      !buildingId ||
      !unit ||
      !role ||
      !emergencyContact?.name ||
      !emergencyContact?.relation ||
      !emergencyContact?.phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const society = await Society.findById(societyId);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found.",
      });
    }

    const building = await Building.findById(buildingId);

    if (!building) {
      return res.status(404).json({
        success: false,
        message: "Building not found.",
      });
    }

    const existingEmail = await Resident.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const existingPhone = await Resident.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const resident = await Resident.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      avatar,
      societyId,
      buildingId,
      unit,
      role,
      emergencyContact,
    });

    return res.status(201).json({
      success: true,
      message: "Resident created successfully.",
      data: resident,
    });
  } catch (error) {
    console.error("Create Resident Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
