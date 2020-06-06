import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';
import { upload as uploadConfig } from '@config/index';
import { ApplicationError } from '@shared/errors';
import { IStorageProvider } from '@shared/providers/StorageProvider/models';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user)
      throw new ApplicationError(
        'Only authenticated users can change avatar',
        401,
      );

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = await this.storageProvider.saveFile(avatarFilename);

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
