import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import PaymentRepository from "../repositories/payment";

export class PaymentController {
  private PaymentRepository: PaymentRepository;

  constructor() {
    this.PaymentRepository = new PaymentRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const payments = await this.PaymentRepository.getAll();
    if (!payments.length) res.status(204);
    else res.status(200).json(payments);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const payment = await this.PaymentRepository.getById(
      parseInt(req.params.id)
    );
    if (!payment) {
      res.status(404).json({ message: "payment not found" });
    } else {
      res.status(200).json(payment);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newPayment = await this.PaymentRepository.create(req.body);
    if (newPayment) res.status(201).json({ message: "Payment added" });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedPayment = await this.PaymentRepository.update(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedPayment) {
      res.status(404).json({ message: "Payment not found" });
    } else {
      res.status(200).json(updatedPayment);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const success = await this.PaymentRepository.delete(
      parseInt(req.params.id)
    );
    if (!success) {
      res.status(404).json({ message: "Payment not found" });
    } else {
      res.status(200).json({ message: "Payment excluido com sucesso" });
    }
  };
}
