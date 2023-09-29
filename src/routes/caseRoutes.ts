import express from "express";
import {
    assignCaseToStaffController,
    createCaseController, getCaseController, getCasesController, getCompletedCasesController, getInProgressCasesController, updateCaseController,
} from "../controllers/caseController";

const router = express.Router();

router.post("/createCase/:clientId", createCaseController);
router.get("/getCase/:caseId", getCaseController);
router.get("/getCases", getCasesController);
router.get("/getCompletedCases", getCompletedCasesController);
router.get("/getOutstandingCases", getInProgressCasesController);

router.put("/updateCase/:caseId", updateCaseController);

router.get("/assignCaseToStaff/:caseId/:staffId", assignCaseToStaffController);



export default router;