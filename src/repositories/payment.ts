import { DataSource, In, Repository } from "typeorm";
import { PaymentEntity } from "../entities/payment";

class PaymentRepository implements PaymentRepository {
  private repository: Repository<PaymentEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PaymentEntity);
  }

  async getAll(): Promise<PaymentEntity[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<PaymentEntity | undefined> {
    const payment = await this.repository.findOneBy({ id });
    return payment || undefined;
  }

  async getBy(ids: number[]): Promise<PaymentEntity[] | undefined> {
    const payments = await this.repository.findBy({
      id: In(ids),
    });
    return payments || undefined;
  }

  async create(payment: Omit<PaymentEntity, "id">): Promise<PaymentEntity> {
    const newPayment = this.repository.create(payment);
    return this.repository.save(newPayment);
  }

  async update(
    id: number,
    payment: Partial<Omit<PaymentEntity, "id">>
  ): Promise<PaymentEntity | undefined> {
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
