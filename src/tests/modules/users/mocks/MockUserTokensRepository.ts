import { UserToken } from '@modules/users/infra/typeorm/entities';
import { IUserTokensRepository } from '@modules/users/repositories';
import { uuid } from 'uuidv4';

class MockUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find((u) => u.token === token);
    return userToken;
  }
}

export default MockUserTokensRepository;
