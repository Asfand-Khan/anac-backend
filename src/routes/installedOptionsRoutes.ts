import { Router } from "express";
import { createInstalledOptionsHandler, getAllInstalledOptionsHandler } from "../controllers/installedOptionsController";

const router = Router();

router.get("/", getAllInstalledOptionsHandler); // For Fetching All InstalledOptions
router.post("/", createInstalledOptionsHandler); // For Creating InstalledOptions


export default router;
