import { Router } from "express";
import { createPopularFeaturesHandler, getAllPopularFeaturesHandler } from "../controllers/popularFeaturesController";

const router = Router();

router.get("/", getAllPopularFeaturesHandler); // For Fetching All PopularFeatures
router.post("/", createPopularFeaturesHandler); // For Creating PopularFeatures


export default router;
