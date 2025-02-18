import { Router } from "express";
import { createCarsHandler, deleteCarHandler, getAllCarsHandler, getSingleCarHandler, updateCarHandler } from "../controllers/carController";

const router = Router();

router.get("/", getAllCarsHandler); // For Fetching All Cars
router.post("/", createCarsHandler); // For Creating Cars
router.get("/:id", getSingleCarHandler); // For Fetching Single Car
router.put("/:id", updateCarHandler); // For Updating Car
router.delete("/:id", deleteCarHandler); // For Updating Car

export default router;
