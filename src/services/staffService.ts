import { validationErrorHandler } from "../helpers/errorHandler";
import {Staff} from "../models/staff";

export async function getCasesByStaff(
    staffId: number,
) {
    let staff = await Staff.findOne({
        where: {staffId: staffId},
    })

    if(staff) {
        return staff.getCases();
    } else {
        throw {error: "Such client does not exist"};
    }
}