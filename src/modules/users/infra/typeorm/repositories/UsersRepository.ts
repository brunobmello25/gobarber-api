import { getRepository, Repository, Not } from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';
import { IFindAllProvidersDTO, ICreateUserDTO } from '@modules/users/dtos';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findAllProviders({
    exceptUserId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (exceptUserId) {
      users = await this.repository.find({ where: { id: Not(exceptUserId) } });
    } else {
      users = await this.repository.find();
    }

    return users;
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
