import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import ClientRepository from "../repositories/client";

export class ClientController {
  private ClientRepository: ClientRepository;

  constructor() {
    this.ClientRepository = new ClientRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const { limit = 10, offset = 0 } = req.query;
    const clients = await this.ClientRepository.getAll(
      Number(limit),
      Number(offset)
    );

    if (!clients.length) res.status(204).send();
    else res.status(200).json(clients);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const client = await this.ClientRepository.getById(parseInt(req.params.id));
    if (!client) {
      res.status(404).json({ message: "client not found" });
    } else {
      res.status(200).json(client);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newClient = await this.ClientRepository.create(req.body);
    if (newClient) res.status(201).json({ message: "Client added" });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedClient = await this.ClientRepository.update(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedClient) {
      res.status(404).json({ message: "Client not found" });
    } else {
      res.status(200).json(updatedClient);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const success = await this.ClientRepository.delete(parseInt(req.params.id));
    if (!success) {
      res.status(404).json({ message: "Client not found" });
    } else {
      res.status(200).json({ message: "Client excluído com sucesso" });
    }
  };
}
