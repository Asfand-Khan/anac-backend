import { Router } from "express";
import { createCarsHandler, getAllCarsHandler } from "../controllers/carController";

const router = Router();

router.get("/", getAllCarsHandler);
router.post("/", createCarsHandler);

export default router;
