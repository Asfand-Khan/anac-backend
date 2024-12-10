import { Router } from "express";
import { createModelHandler, getAllModelsHandler } from "../controllers/modelController";

const router = Router();

router.get("/", getAllModelsHandler); // For Fetching All Models
router.post("/", createModelHandler); // For Creating Model


export default router;
