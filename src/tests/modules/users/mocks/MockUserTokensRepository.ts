import { UserToken } from '@modules/users/infra/typeorm/entities';
import { IUserTokensRepository } from '@modules/users/repositories';
import { uuid } from 'uuidv4';

class MockUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, { id: uuid(), token: uuid(), userId });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default MockUserTokensRepository;
