import { Router } from "express";
import { createStandardFeaturesHandler, getAllStandardFeaturesHandler } from "../controllers/standardFeaturesController";

const router = Router();

router.get("/", getAllStandardFeaturesHandler); // For Fetching All Models
router.post("/", createStandardFeaturesHandler); // For Creating Model


export default router;
