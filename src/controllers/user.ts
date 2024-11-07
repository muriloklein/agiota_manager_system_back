import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import UserRepository from "../repositories/user";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(appDataSource);
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { name, pin } = req.body;

    if (!name || !pin) {
      res.status(400).json({ message: "Name and PIN are required" });
      return;
    }

    const user = await this.userRepository.getByName(name as string);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPinValid = (pin as string) == user.pin;

    if (!isPinValid) {
      res.status(401).json({ message: "Invalid PIN" });
      return;
    }

    if (isPinValid && user.name == name) {
      res.status(200).json({ message: "Login successful", user });
      return;
    }

    res.status(401).json({ message: "Invalid credentials" });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { name, pin } = req.body;

    if (!name || !pin) {
      res.status(400).json({ message: "Name and PIN are required" });
      return;
    }
    try {
      const newUser = await this.userRepository.create({
        name,
        pin,
      });
      res.status(201).json({ message: "User added", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
