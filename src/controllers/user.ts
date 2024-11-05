import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import UserRepository from "../repositories/user";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const { limit = 10, offset = 0 } = req.query;
    const users = await this.userRepository.getAll(
      Number(limit),
      Number(offset)
    );

    if (!users.length) res.status(204).send();
    else res.status(200).json(users);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const user = await this.userRepository.getById(parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newUser = await this.userRepository.create(req.body);
    if (newUser) res.status(201).json({ message: "User added" });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedUser = await this.userRepository.update(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const success = await this.userRepository.delete(parseInt(req.params.id));
    if (!success) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User excluído com sucesso" });
    }
  };
}
