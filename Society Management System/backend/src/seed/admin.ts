import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/AdminSchema";

dotenv.config();

const adminSeed = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await Admin.findOne({
      email: "nikhilducktale9@gmail.com",
    });

    if (adminExists) {
      console.log("Super Admin already exists");
      return;
    }

    const superAdmin = await Admin.create({
      name: "Nikhil Thakur",
      email: "nikhilducktale9@gmail.com",
      phone: "9876543210",
      profileImage: "",
      password: "nik@123",
      role: "super_admin",
    });

    console.log(`Super Admin created: ${superAdmin.email}`);
  } catch (error) {
    console.error("Seed Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

adminSeed();
