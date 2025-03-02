import { Router } from "express";
import { createAfterMarketAccessoriesHandler, deleteAfterMarketAccessoryHandler, getAllAfterMarketAccessoriesHandler, getSingleAfterMarketAccessoriesHandler, updateAfterMarketAccessoryHandler } from "../controllers/afterMarketAccessoriesController";

const router = Router();

router.get("/", getAllAfterMarketAccessoriesHandler); // For Fetching All AfterMarketAccessories
router.post("/", createAfterMarketAccessoriesHandler); // For Creating AfterMarketAccessories
router.get("/:id", getSingleAfterMarketAccessoriesHandler); // For Fetching Single AfterMarketAccessories
router.put("/:id", updateAfterMarketAccessoryHandler); // For Updating AfterMarketAccessories
router.delete("/:id", deleteAfterMarketAccessoryHandler); // For Deleting AfterMarketAccessories

export default router;
