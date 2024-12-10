import { Router } from "express";
import { createAfterMarketAccessoriesHandler, getAllAfterMarketAccessoriesHandler } from "../controllers/afterMarketAccessoriesController";

const router = Router();

router.get("/", getAllAfterMarketAccessoriesHandler); // For Fetching All AfterMarketAccessories
router.post("/", createAfterMarketAccessoriesHandler); // For Creating AfterMarketAccessories

export default router;
