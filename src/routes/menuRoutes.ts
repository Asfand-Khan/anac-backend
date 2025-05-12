import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getAllMenusHandler } from "../controllers/userController";

const router = Router();

router.get("/", authMiddleware, getAllMenusHandler); // For All Menus

export default router;