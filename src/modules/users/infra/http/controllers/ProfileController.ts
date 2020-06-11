import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProfileService } from '@modules/users/services';

class ProfileController {
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
