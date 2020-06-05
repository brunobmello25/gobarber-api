import { Request, Response } from 'express';
import { container } from 'tsyringe';

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

    delete user.password;

    return response.json({ user, token });
  }
}

export default new SessionsController();
