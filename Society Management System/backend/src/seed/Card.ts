import Card from "../models/Card";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const seedCards = [
  // --- DATA FOR COMPONENT 1 (Dashboard General Cards) ---
  {
    type: "dashboard_card",
    title: "TOTAL SOCIETIES",
    value: "1,284",
    percentage: "+12%",
    icon: "Building2",
  },
  {
    type: "dashboard_card",
    title: "TOTAL RESIDENTS",
    value: "42,910",
    percentage: "+8.4%",
    icon: "Users",
  },
  {
    type: "dashboard_card",
    title: "TOTAL REVENUE",
    value: "$542,000",
    percentage: "+15%",
    icon: "HandCoins",
  },
  {
    type: "dashboard_card",
    title: "ACTIVE SUBSCRIPTIONS",
    value: "1,150",
    percentage: "+15%",
    icon: "MonitorPlay",
  },
  {
    type: "dashboard_card",
    title: "OPEN TICKETS",
    value: "1,150",
    percentage: "+15%",
    icon: "Tickets",
  },

  // --- DATA FOR COMPONENT 2 (Society Overview Cards) ---
  {
    type: "society_card",
    title: "Total Societies",
    value: "1,284",
    percentage: "+12%",
    icon: "ArrowUp",
  },
  {
    type: "society_card",
    title: "Inactive Societies",
    value: "120",
    percentage: "-3%",
    icon: "ArrowDown",
  },
  {
    type: "society_card",
    title: "Active Societies",
    value: "1,164",
    percentage: "+8%",
    icon: "ArrowUp",
  },
  {
    type: "society_card",
    title: "New Societies",
    value: "45",
    percentage: "+22%",
    icon: "ArrowUp",
  },
];

const cardSeed = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URI);

    await Card.deleteMany({});
    console.log("inserting data");
    await Card.insertMany(seedCards);
    console.log("🌱 Successfully seeded both types of card data");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

cardSeed();
