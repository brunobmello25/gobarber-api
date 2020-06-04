import path from 'path';
import fs from 'fs';

import { User } from 'modules/users/entities';
import { UsersRepository } from 'modules/users/repositories';
import { upload as uploadConfig } from 'config';
import { ApplicationError } from 'shared/errors';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findOne(userId);

    if (!user)
      throw new ApplicationError(
        'Only authenticated users can change avatar',
        401,
      );

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const existsUserAvatar = await fs.promises.stat(userAvatarFilePath);

      if (existsUserAvatar) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
