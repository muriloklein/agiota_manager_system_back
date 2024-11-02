import { DataSource, In, Repository } from "typeorm";
import { Payment } from "../entities/payment";

class PaymentRepository implements PaymentRepository {
  private repository: Repository<Payment>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Payment);
  }

  async getAll(): Promise<Payment[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<Payment | undefined> {
    const payment = await this.repository.findOneBy({ id });
    return payment || undefined;
  }

  async getBy(ids: number[]): Promise<Payment[] | undefined> {
    const payments = await this.repository.findBy({
      id: In(ids),
    });
    return payments || undefined;
  }

  async create(payment: Omit<Payment, "id">): Promise<Payment> {
    const newPayment = this.repository.create(payment);
    return this.repository.save(newPayment);
  }

  async update(
    id: number,
    payment: Partial<Omit<Payment, "id">>
  ): Promise<Payment | undefined> {
    const paymentToUpdate = await this.getById(id);

    if (!paymentToUpdate) {
      return undefined;
    }

    const updatedPayment = this.repository.merge(paymentToUpdate, payment);
    return this.repository.save(updatedPayment);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result?.affected ? result.affected > 0 : false;
  }
}

export default PaymentRepository;
