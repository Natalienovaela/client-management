import { conn } from "../db";
import {Client} from "./client";
import {Case} from "./case";
import {Staff} from "./staff";

import {CaseType} from "./enumerated";

function addCascadeOptions(options: object) {
    return { ...options, onDelete: "CASCADE", onUpdate: "CASCADE" };
}

export const createDatabase = async (options: any) => {
    //create relationships
    Client.hasMany(
        Case,
        addCascadeOptions({foreignKey: "clientId"}),
    )

    console.log("here");

    Staff.hasMany(
        Case,
        addCascadeOptions({foreignKey: "staffId"}),
    )

    Case.belongsTo(Client, addCascadeOptions({foreignKey: "clientId"}))
    
    Case.belongsTo(Staff, addCascadeOptions({foreignKey: "staffId"}))
    
    if (options["forced"]) {
        await conn.sync({ force: options.forced });
      } else {
        await conn.sync();
      }

};

export const seedDatabase = async () => {
    await tutorial();
}

export const tutorial = async() => {
    let case1 = await Case.create({
        caseCreationDate: new Date(Date.now()),
        caseMessage: "This is case 1",
        caseProgress: CaseType.IN_PROGRESS,  
    });

    let case2 = await Case.create({
        caseCreationDate: new Date(Date.now()),
        caseMessage: "This is case 2",
        caseProgress: CaseType.IN_PROGRESS  
    })

    let case3 = await Case.create({
        caseCreationDate: new Date(Date.now()),
        caseMessage: "This is case 3",
        caseProgress: CaseType.COMPLETED  
    })

    let case4 = await Case.create({
        caseCreationDate: new Date(Date.now()),
        caseMessage: "This is case 4",
        caseProgress: CaseType.COMPLETED  
    })

    let staff1 = await Staff.create({
        staffName: "Staff 1",
    })

    staff1.addCases(case1);
    staff1.addCases(case3);

    let staff2 = await Staff.create({
        staffName: "Staff 2",
    })

    staff2.addCases(case2);
    staff2.addCases(case4);

    let client1 = await Client.create({
        clientName: "Client 1",
        clientBirthdate: new Date("1999-05-12"),
        clientAddress: "Client 1's address",
        company: "Company 1",
    })

    client1.addCases(case1);
    client1.addCases(case2);

    let client2 = await Client.create({
        clientName: "Client 2",
        clientBirthdate: new Date("2003-02-09"),
        clientAddress: "Client 2's address",
        company: "Company 2",
    })

    client2.addCases(case3);

    let client3 = await Client.create({
        clientName: "Client 3",
        clientBirthdate: new Date("2012-02-09"),
        clientAddress: "Client 3's address",
        company: "Company 3",
    })

    client3.addCases(case4);

    case4.setClient(client3);
    case4.setStaff(staff2);

    case3.setClient(client2);
    case3.setStaff(staff1);

    case2.setClient(client1);
    case2.setStaff(staff2);

    case1.setClient(client1);
    case1.setStaff(staff1);
}

