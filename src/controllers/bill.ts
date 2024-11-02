import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import BillRepository from "../repositories/bill";

export class BillController {
  private BillRepository: BillRepository;

  constructor() {
    this.BillRepository = new BillRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const bills = await this.BillRepository.getAll();
    if (!bills.length) res.status(204);
    else res.status(200).json(bills);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const bill = await this.BillRepository.getById(parseInt(req.params.id));
    if (!bill) {
      res.status(404).json({ message: "bill not found" });
    } else {
      res.status(200).json(bill);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newBill = await this.BillRepository.create(req.body);
    if (newBill) res.status(201).json({ message: "Bill added" });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedBill = await this.BillRepository.update(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedBill) {
      res.status(404).json({ message: "Bill not found" });
    } else {
      res.status(200).json(updatedBill);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const success = await this.BillRepository.delete(parseInt(req.params.id));
    if (!success) {
      res.status(404).json({ message: "Bill not found" });
    } else {
      res.status(200).json({ message: "Bill excluido com sucesso" });
    }
  };
}
