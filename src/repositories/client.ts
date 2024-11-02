import { DataSource, In, Repository } from "typeorm";
import { ClientEntity } from "../entities/client";

class ClientRepository implements ClientRepository {
  private repository: Repository<ClientEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(ClientEntity);
  }

  async getAll(): Promise<ClientEntity[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<ClientEntity | undefined> {
    const client = await this.repository.findOneBy({ id });
    return client || undefined;
  }

  async getBy(ids: number[]): Promise<ClientEntity[] | undefined> {
    const clients = await this.repository.findBy({
      id: In(ids),
    });
    return clients || undefined;
  }

  async create(client: Omit<ClientEntity, "id">): Promise<ClientEntity> {
    const newClient = this.repository.create(client);
    return this.repository.save(newClient);
  }

  async update(
    id: number,
    client: Partial<Omit<ClientEntity, "id">>
  ): Promise<ClientEntity | undefined> {
    const clientToUpdate = await this.getById(id);

    if (!clientToUpdate) {
      return undefined;
    }

    const updatedClient = this.repository.merge(clientToUpdate, client);
    return this.repository.save(updatedClient);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result?.affected ? result.affected > 0 : false;
  }
}

export default ClientRepository;
