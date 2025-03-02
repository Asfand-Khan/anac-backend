import { Router } from "express";
import { createUsersHandler, getAllUsersHandler, getSingleUserHandler, loginUsersHandler } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllUsersHandler); // For Fetching All Users
router.post("/", authMiddleware, createUsersHandler); // For Creating User
router.get("/:id", authMiddleware, getSingleUserHandler); // For Single User

router.post("/login", loginUsersHandler); // For User Login

export default router;