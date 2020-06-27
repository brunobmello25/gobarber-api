import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

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

    response.status(200).json({ user: classToClass(user) });
  }

  async update(request: Request, response: Response) {
    const userId = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const user = await container
      .resolve(UpdateProfileService)
      .execute({ userId, name, email, oldPassword, password });

    return response.status(204).json({ user: classToClass(user) });
  }
}

export default new ProfileController();
