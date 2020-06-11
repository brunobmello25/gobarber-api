import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories';
import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import { User } from '@modules/users/infra/typeorm/entities';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new ApplicationError('User does not exist');

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail && userWithSameEmail.id !== user.id)
      throw new ApplicationError('Email already in use');

    if (password && !oldPassword)
      throw new ApplicationError('Old password not informed');

    if (password && oldPassword) {
      const isOldPasswordCorrect = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!isOldPasswordCorrect) {
        throw new ApplicationError('Old password is not correct');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
