import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import UserRepository from "../repositories/user";

export class UserController {
  private UserRepository: UserRepository;

  constructor() {
    this.UserRepository = new UserRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.UserRepository.getAll();
    if (!users.length) res.status(204);
    else res.status(200).json(users);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const user = await this.UserRepository.getById(parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(200).json(user);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newUser = await this.UserRepository.create(req.body);
    if (newUser) res.status(201).json({ message: "User added" });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedUser = await this.UserRepository.update(
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
    const success = await this.UserRepository.delete(parseInt(req.params.id));
    if (!success) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User Deleted" });
    }
  };
}
