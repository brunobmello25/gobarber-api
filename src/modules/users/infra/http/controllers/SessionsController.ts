import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { AuthenticateUserService } from '@modules/users/services';

class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const { user, token } = await container
      .resolve(AuthenticateUserService)
      .execute({
        email,
        password,
      });

    return response.json({ user: classToClass(user), token });
  }
}

export default new SessionsController();
