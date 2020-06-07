import { UserToken } from '@modules/users/infra/typeorm/entities';

export default interface IUserTokensRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
