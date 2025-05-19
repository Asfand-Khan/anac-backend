import { Router } from "express";
import {
  createSample,
  deleteSample,
  getAllSamples,
  getSingleSample,
  updateSample,
} from "../controllers/sampleController";

const router = Router();

router.get("/", getAllSamples);
router.get("/:id", getSingleSample);
router.post("/", createSample);
router.put("/:id", updateSample);
router.delete("/:id", deleteSample);

export default router;
