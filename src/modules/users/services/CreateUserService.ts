import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';
import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import { ApplicationError } from '@shared/errors';
import { ICacheProvider } from '@shared/providers/CacheProvider/models';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const isEmailUsed = await this.usersRepository.findByEmail(email);

    if (isEmailUsed) throw new ApplicationError('Email address already in use');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
