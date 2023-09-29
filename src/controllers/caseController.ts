import { Request, Response } from "express";
import * as CaseService from "../services/caseService";
import {CaseType} from "../models/enumerated";

export async function createCaseController(req: Request, res: Response) {
    try {
        const {
            caseSubject,
            caseMessage,
        } = req.body;

        const {clientId} = req.params;

        if(caseSubject && caseMessage) {
            let result = await CaseService.createCase(Number(clientId), caseSubject, caseMessage, CaseType.IN_PROGRESS);
            return res.status(200).json({result: result});
        }
        
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export const getCaseController = async (req: Request, res: Response) => {
    try {
        const {caseId} = req.params;
        let result = await CaseService.getCase(Number(caseId));
        return res.status(200).json({result: result});
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }
}

export async function getCasesController(req:Request, res:Response) {
    try {
        let result = await CaseService.getCases("NONE");
        return res.status(200).json({result: result});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function getCompletedCasesController(req: Request, res: Response) {
    try {
        let result = await CaseService.getCases("COMPLETED");
        return res.status(200).json({result: result});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function getInProgressCasesController(req: Request, res: Response) {
    try {
        let result = await CaseService.getCases("IN_PROGRESS");
        return res.status(200).json({result: result});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function updateCaseController(req: Request, res: Response) {
    try {
        const {caseId} = req.params
        const {
            caseSubject,
            caseMessage, 
            caseProgress
        } = req.body;
        await CaseService.updateCase(Number(caseId), caseSubject, caseMessage, caseProgress);
        return res.status(200).json({result: "Case information has been updated"});

    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export async function assignCaseToStaffController(req: Request, res: Response) {
    try {
        const {caseId, staffId} = req.params;

        let result = await CaseService.assignCaseToStaff(Number(staffId), Number(caseId));
        return res.status(200).json({result: result});
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

