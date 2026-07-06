import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import SocietyAdmin from "../../models/SocietyAdmin";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Email from request:", email);
    const user = await SocietyAdmin.findOne({ email });

    console.log("amin", user);
    if (!user) {
      return res.status(401).json({ message: "User Not found" });
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,

        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
