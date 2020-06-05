import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from '@modules/users/services';

class UsersController {
  public async update(request: Request, response: Response) {
    const user = await container.resolve(UpdateUserAvatarService).execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json({ ok: true });
  }
}

export default new UsersController();
