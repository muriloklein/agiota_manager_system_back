import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user";

class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async getByName(name: string): Promise<User | null> {
    return this.repository.findOneBy({ name });
  }

  async getAll(limit: number, offset: number): Promise<User[]> {
    return this.repository.find({
      skip: offset,
      take: limit,
    });
  }

  async getById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async update(
    id: number,
    user: Partial<Omit<User, "id">>
  ): Promise<User | undefined> {
    const userToUpdate = await this.getById(id);
    if (!userToUpdate) return undefined;

    const updatedUser = this.repository.merge(userToUpdate, user);
    return this.repository.save(updatedUser);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}

export default UserRepository;
