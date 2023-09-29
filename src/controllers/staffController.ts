import { Request, Response } from "express";
import * as StaffService from "../services/staffService";

export async function getCasesByStaffController(req: Request, res: Response) {
    try {
        const {staffId} = req.params;
        let result = await StaffService.getCasesByStaff(Number(staffId));
        return res.status(200).json({result: result});
    } catch (error: any) {
        return res.status(400).json({error:error.message});
    }
}