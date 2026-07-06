import { Request, Response } from "express";
import Society from "../../models/CreateSociety";
import SocietyAdmin from "../../models/SocietyAdmin";

export const updateSociety = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

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
    } = req.body;

    const society = await Society.findById(id);

    if (!society) {
      return res.status(404).json({
        success: false,
        message: "Society not found",
      });
    }

    society.name = name;
    society.registrationNumber = registrationNumber;
    society.societyType = societyType;
    society.address = address;
    society.city = city;
    society.country = country;
    society.subscriptionPlan = subscriptionPlan;

    await society.save();

    // Update society admin details
    await SocietyAdmin.findByIdAndUpdate(
      society.admin,
      {
        name: adminName,
        email: adminEmail,
        phone: adminPhone,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    const updatedSociety = await Society.findById(id).populate("admin");

    return res.status(200).json({
      success: true,
      message: "Society updated successfully",
      data: updatedSociety,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
