import { uuid } from 'uuidv4';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';

class MockUsersRepository implements IUsersRepository {
  private repository: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), ...data });

    this.repository.push(user);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.repository.find((u) => u.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.find((u) => u.email === email);
  }

  public async save(user: User): Promise<User> {
    const index = this.repository.findIndex((u) => u.id === user.id);
    this.repository[index] = user;
    return user;
  }
}

export default MockUsersRepository;
