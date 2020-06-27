import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories';
import { User } from '@modules/users/infra/typeorm/entities';
import { ICacheProvider } from '@shared/providers/CacheProvider/models';
// import { ApplicationError } from '@shared/errors';

interface IRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.fetch<User[]>(
      `providers-list:${userId}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptUserId: userId,
      });

      await this.cacheProvider.save(`providers-list:${userId}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
