import { validationErrorHandler } from "../helpers/errorHandler";
import {Client} from "../models/client";

export async function createClient(
    clientName: string,
    clientAddress: string,
    clientBirthdate: string,
    company: string,
) {

    const client: any = {
        clientName: clientName,
        clientAddress: clientAddress,
        clientBirthdate: new Date(clientBirthdate),
        company: company,
    };

    try {
        let newClient = await Client.create(client);
        return newClient;
    } catch (error: any) {
        throw validationErrorHandler(error);
    }
    
} 

export async function getClient(
    clientId: number,
) {
    let client = await Client.findOne({
        where: {clientId: clientId},
        include: ["cases"],
    })

    if(client) {
        console.log("is it here before?");
        return client;
    } else {
        throw {error: "Such client does not exist"};
    }

}

export async function getClients() {
    let clients = await Client.findAll({
        include: ["cases"],
    })

    if(clients) {
        return clients;
    } else {
        throw {error: "No client is available"};
    }
}

export async function deleteClient(
    clientId: number,
) {
    try {
        await Client.destroy({
            where: {clientId: clientId},
        });
    } catch (error: any) {
        throw {error: "Such client does not exist"};
    }

}

export async function updateClient(
    clientId: number,
    clientName: string,
    clientAddress: string,
    clientBirthdate: string,
    company: string,
) {
    let updatedClient = {
        clientName: clientName,
        clientAddress: clientAddress,
        clientBirthdate: new Date(clientBirthdate),
        company: company,
    }
    try {
        await Client.update(updatedClient, {
            where: {clientId: clientId},
        })
    } catch (error: any) {
        throw {error: "Such client does not exist"};
    }
}

export async function getCasesByClient(
    clientId: number,
) {
    let client = await Client.findOne({
        where: {clientId: clientId},
    })

    if(client) {
        return client.getCases();
    } else {
        throw {error: "Such client does not exist"};
    }
}