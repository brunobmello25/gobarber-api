import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { UpdateUserAvatarService } from '@modules/users/services';

class UsersController {
  public async update(request: Request, response: Response) {
    const user = await container.resolve(UpdateUserAvatarService).execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ user: classToClass(user) });
  }
}

export default new UsersController();
