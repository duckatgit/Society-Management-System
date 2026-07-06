import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import adminRoute from "./routes/authRoute";
import connectDB from "./config/DB";

const app = express();
const PORT = process.env.PORT || 5174;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api", adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
