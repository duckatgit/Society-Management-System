import express, { Router } from "express";
import { loginAdmin } from "../controllers/auth/adminAuth";
import { forgotPassword } from "../controllers/auth/forgetAuth";
import resetPassword from "../controllers/auth/resetAuth";
import createSociety from "../controllers/society/societyCreate";
import { getSociety } from "../controllers/society/getSociety";

import { createAnnouncement } from "../controllers/announcement/Annoucement";
import { getAnnoucement } from "../controllers/announcement/getAnnouncemet";
import { changeAdminPassword } from "../controllers/auth/changePass";
import { protect } from "../middleware/authMiddleware";
import { deleteAnnounce } from "../controllers/announcement/deleteAnnouncement";
import { deleteSociety } from "../controllers/society/deleteSociety";
import { updateProfile } from "../controllers/auth/profileUpdate";

import { userLogin } from "../controllers/auth/userLogin";
import { verifyToken } from "../middleware/verifyToken";
import { getProfile } from "../controllers/auth/getProfile";
import getSocietyAdmin from "../controllers/society/getScoietyAdmin";
import { CreateBuilding } from "../controllers/building/createBuilding";
import { getBuilding } from "../controllers/building/getBuilding";
import { deleteBuilding } from "../controllers/building/deleteBuilding";
import { updateBuilding } from "../controllers/building/updateBuilding";
import { updateSociety } from "../controllers/society/updateSociety";
import { updateAnnouncement } from "../controllers/announcement/updateAnnouncement";
import { createResident } from "../controllers/resident/resident";
import { getResident } from "../controllers/resident/getResident";
import { updateResident } from "../controllers/resident/updateResident";
import { deleteResident } from "../controllers/resident/deleteResident";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/society/login", userLogin);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/society", verifyToken, createSociety);
router.get("/societies", verifyToken, getSociety);

router.get("/announcements", verifyToken, getAnnoucement);
router.post("/announcement", verifyToken, createAnnouncement);
router.delete("/delete/:id", verifyToken, deleteAnnounce);
router.patch("/update/announcement/:id", verifyToken, updateAnnouncement);

router.patch("/change-password", protect, changeAdminPassword);

router.patch("/society/delete/:id", verifyToken, deleteSociety);
router.patch("/profile/update", verifyToken, updateProfile);
router.get("/profile", verifyToken, getProfile);
router.get("/society/profile", verifyToken, getSocietyAdmin);
router.post("/create/building", verifyToken, CreateBuilding);
router.get("/building", verifyToken, getBuilding);
router.patch("/building/delete/:id", verifyToken, deleteBuilding);
router.patch("/update/building/:id", verifyToken, updateBuilding);
router.patch("/update/society/:id", verifyToken, updateSociety);

router.post("/create/resident", verifyToken, createResident);
router.get("/resident", verifyToken, getResident);
router.patch("/update/resident/:id", verifyToken, updateResident);
router.patch("/delete/resident/:id", verifyToken, deleteResident);
export default router;
