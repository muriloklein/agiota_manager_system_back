import { DataSource, In, Repository } from "typeorm";
import { Bill } from "../entities/bill";

class BillRepository implements BillRepository {
  private repository: Repository<Bill>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Bill);
  }

  async getAll(): Promise<Bill[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<Bill | undefined> {
    const bill = await this.repository.findOneBy({ id });
    return bill || undefined;
  }

  async getBy(ids: number[]): Promise<Bill[] | undefined> {
    const bills = await this.repository.findBy({
      id: In(ids),
    });
    return bills || undefined;
  }

  async create(cientista: Omit<Bill, "id">): Promise<Bill> {
    const newBill = this.repository.create(cientista);
    return this.repository.save(newBill);
  }

  async update(
    id: number,
    bill: Partial<Omit<Bill, "id">>
  ): Promise<Bill | undefined> {
    const billToUpdate = await this.getById(id);

    if (!billToUpdate) {
      return undefined;
    }

    const updatedBill = this.repository.merge(billToUpdate, bill);
    return this.repository.save(updatedBill);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result?.affected ? result.affected > 0 : false;
  }
}

export default BillRepository;
