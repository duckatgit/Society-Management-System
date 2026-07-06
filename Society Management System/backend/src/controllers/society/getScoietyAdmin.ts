import { AuthRequest } from "../../middleware/verifyToken";
import SocietyAdmin from "../../models/SocietyAdmin";
import { Request, Response } from "express";

const getSocietyAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const user = await SocietyAdmin.findById(req.user?.id);
    if (!user) {
      return res.status(401).json({ message: "Society Admin not found" });
    }

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch society admin",
      error,
    });
  }
};
export default getSocietyAdmin;
