import express from "express";
import {
    createClientController,
    deleteClientController,
    getCasesByClientController,
    getClientController,
    getClientsController,
    updateClientController,
} from "../controllers/clientController";

const router = express.Router();

router.post("/createClient", createClientController);
router.delete("/deleteClient/:clientId", deleteClientController);

router.get("/getClient/:clientId", getClientController);
router.get("/getClients", getClientsController);
router.put("/updateClient/:clientId", updateClientController);

router.get("/getCasesByClient/:clientId", getCasesByClientController);


export default router;