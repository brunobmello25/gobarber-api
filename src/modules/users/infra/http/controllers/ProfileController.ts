import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  UpdateProfileService,
  ShowProfileService,
} from '@modules/users/services';

class ProfileController {
  async show(request: Request, response: Response) {
    const userId = request.user.id;

    const user = await container
      .resolve(ShowProfileService)
      .execute({ userId });

    delete user.password;

    response.status(200).json({ user });
  }

  async update(request: Request, response: Response) {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const user = await container
      .resolve(UpdateProfileService)
      .execute({ userId, name, email, oldPassword, password });

    delete user.password;

    return response.status(204).json({ user });
  }
}

export default new ProfileController();
