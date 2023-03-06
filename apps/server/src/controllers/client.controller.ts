import { Request, Response } from "express";
import { ClientService } from "../services/client.services";
import { getIdOrVoid } from "../utils";
const clientService = new ClientService();

export class ClientController {
  async getClients(req: Request, res: Response) {
    try {
      const clients = await clientService.getClients();
      res.json(clients);
    } catch (err) {
      console.log("error on getting clients");
    }
  }

  async getclientById(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const clients = await clientService.getClientById(id);
        if (clients) {
          res.json(clients);
        } else {
          res.json({ message: "client not found for this id" });
        }
      } catch (err) {
        console.log("error on getting client by his id");
      }
    }
  }

  async createClient(req: Request, res: Response) {
    try {
      const newClient = await clientService.createClient(req.body);
      res.json(newClient);
    } catch (error: unknown) {
      console.log("error on creating client");
    }
  }

  async updateClient(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesClientExist = await clientService.checkIfClientExists(id);
        if (doesClientExist) {
          const updatedClient = await clientService.updateClient(id, req.body);
          res.json(updatedClient);
        } else {
          res.json({ message: "Client not found for this id..." });
        }
      } catch (error: unknown) {
        console.log("error on updating client");
      }
    }
  }

  async deleteClient(req: Request, res: Response) {
    const id = getIdOrVoid(req.params.id, res);
    if (id) {
      try {
        const doesClientExist = await clientService.checkIfClientExists(id);
        if (doesClientExist) {
          const deleteClient = await clientService.deleteClient(id);
          res.json(deleteClient);
        } else {
          res.json({ message: "Client not found for this id..." });
        }
      } catch (error: unknown) {
        console.log("error on deleting client");
      }
    }
  }
}
