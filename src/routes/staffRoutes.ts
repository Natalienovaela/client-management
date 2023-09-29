import express from "express";
import { getCasesByStaffController } from "../controllers/staffController";

const router = express.Router();

router.get("/getCasesByStaff/:staffId", getCasesByStaffController);

export default router;