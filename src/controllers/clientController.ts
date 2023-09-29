import { Request, Response } from "express";
import * as ClientService from "../services/clientService";

export const createClientController = async (req: Request, res: Response) => {
    try{
        const {
            clientName,
            clientAddress,
            clientBirthdate,
            company
        } = req.body;

        if(clientName && clientAddress && clientBirthdate && company) {
            let newClient = await ClientService.createClient(clientName, clientAddress, clientBirthdate, company);
                return res.status(200).json({result: newClient});

        } else {
            return res.status(400).json({error: "Missing information!"});
        }
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

export const getClientController = async (req: Request, res: Response) => {
    try {
        const {clientId} = req.params;
        console.log("hereeee");
        let client = await ClientService.getClient(Number(clientId));
        console.log("is it here too?")
        return res.status(200).json({result: client});
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }
}

export async function getClientsController(req: Request, res:Response) {
    try {
        let clients = await ClientService.getClients();
        return res.status(200).json({result: clients});
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }
}

export async function deleteClientController(req: Request, res:Response) {
    try {
        const {clientId} = req.params;
        ClientService.deleteClient(Number(clientId));
        return res.status(200).json({message: "Client has been deleted"});
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }
}

export async function updateClientController(req: Request, res: Response) {
    try {
        const {
            clientName,
            clientAddress,
            clientBirthdate,
            company
        } = req.body;
        const {clientId} = req.params;
        ClientService.updateClient(Number(clientId), clientName, clientAddress, clientBirthdate, company);
        res.status(200).json({message: "Client information has been updated"});
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }
}

export async function getCasesByClientController(req: Request, res: Response) {
    try {
        const {clientId} = req.params;
        let result = await ClientService.getCasesByClient(Number(clientId));
        return res.status(200).json({result: result});
    } catch (error: any) {
        return res.status(400).json({error:error.message});
    }
}