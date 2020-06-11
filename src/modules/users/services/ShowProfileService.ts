import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories';
import { User } from '@modules/users/infra/typeorm/entities';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ApplicationError('User not found.');

    return user;
  }
}

export default ShowProfileService;
