import { validationErrorHandler } from "../helpers/errorHandler";
import {Case} from "../models/case";
import {CaseType} from "../models/enumerated";
import {Staff} from "../models/staff";
import {Client} from "../models/client";

export async function createCase(
    clientId: number,
    caseSubject: string,
    caseMessage: string,
    caseProgress: CaseType,

) {
    const caseDetail: any = {
        caseSubject,
        caseMessage,
        caseProgress,
    }
    try {
        let client = await Client.findOne({
            where: {clientId: clientId},
        })
        if(client) {
            let newCase = await Case.create(caseDetail);
            newCase.setClient(client);
            client.addCases(newCase);
            return newCase;
        } else {
            throw {error: "Client id does not exist"};
        }
        
    } catch (error: any) {
        throw validationErrorHandler(error);
    }
}

export async function getCase(
    caseId: number,
) {
    try {
        let result = await Case.findOne({
            where: {caseId: caseId},
            include: ["client", "staff"],
        })
        return result;
    } catch (error: any) {
        throw {error: "Such Case does not exist"};
    }
}

export async function getCases(
    caseType: string,
) {
    try {
        if(caseType !== "NONE") {
            let result = await Case.findAll({
                where: {caseProgress: caseType},
                include: ["client", "staff"],
            })

            return result;
        } else {
            let result = await Case.findAll({
                include: ["client", "staff"],
            });

            return result;
        }
    } catch (error: any) {
        throw {error: "No case found"};
    }
}

export async function updateCase(
    caseId: number, 
    caseSubject: string,
    caseMessage: string, 
    caseProgress: CaseType,
) {
    let updatedCase = {
        caseSubject: caseSubject,
        caseMessage: caseMessage,
        caseProgress: caseProgress
    }
    try {
        await Case.update(updatedCase, {
            where: {caseId: caseId},
        })
    } catch (error: any) {
        throw {error: "Such case does not exist"};
    }
}

export async function assignCaseToStaff(
    staffId: number,
    caseId: number,
) {
    try {
        let staff = await Staff.findOne({
            where: {staffId: staffId},
        })

        let returnedCase = await Case.findOne({
            where: {caseId: caseId},
        })
        
        if(staff && returnedCase) {
            staff.addCases(returnedCase);
            returnedCase.setStaff(staff);
            returnedCase?.getStaff();
            return returnedCase;
        }
        else {
            throw {error: "The record is not in the database"};
        }
    } catch (error: any) {
        throw {error: error.message};
    }
}
