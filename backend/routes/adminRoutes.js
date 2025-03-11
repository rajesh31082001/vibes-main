import express from "express";
import { protectRoute, adminRoute } from "../middleware/middleware.js";
import { deleteUser, freezeUser } from "../controllers/adminController.js";

const router = express.Router();

// Admin actions
router.delete("/user/:id", protectRoute, adminRoute, deleteUser);
router.put("/user/:id/freeze", protectRoute, adminRoute, freezeUser);

export default router;
