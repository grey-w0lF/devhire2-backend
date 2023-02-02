import express from "express";
const router = express.Router();
import upload from "../../middleware/uploadMiddleware.js";
import { protect } from "../../middleware/authMiddleware.js";
import {
  createProfile,
  getUserProfile,
  getAllProfiles,
  getProfileById,
} from "../../controllers/profileController.js";
router.patch("/create-profile", protect, createProfile);
router.get("/my-profile", protect, getUserProfile);
router.get("/dev/:id", getProfileById);
router.get("/all-profiles", getAllProfiles);

export default router;
