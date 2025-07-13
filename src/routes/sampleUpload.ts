import { Router } from "express";
import {
  sampleReportUpload
} from "../controllers/sampleController";

const router = Router();

router.post("/", sampleReportUpload);

export default router;
