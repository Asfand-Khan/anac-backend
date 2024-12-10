import { Router } from "express";
import { createCompaniesHandler, getAllCompaniesHandler } from "../controllers/companyController";

const router = Router();

router.get("/", getAllCompaniesHandler); // For Fetching All Companies
router.post("/", createCompaniesHandler); // For Creating Companies


export default router;
