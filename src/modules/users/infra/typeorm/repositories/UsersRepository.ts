import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }

  public save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

export default UsersRepository;
