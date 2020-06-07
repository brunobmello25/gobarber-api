import { getRepository, Repository } from 'typeorm';

import { UserToken } from '@modules/users/infra/typeorm/entities';
import { IUserTokensRepository } from '@modules/users/repositories';

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async generate(userId: string): Promise<UserToken> {
    const userToken = this.repository.create({ userId });

    await this.repository.save(userToken);

    return userToken;
  }

  findByToken(token: string): Promise<UserToken | undefined> {
    return this.repository.findOne({ where: { token } });
  }
}

export default UserTokensRepository;
