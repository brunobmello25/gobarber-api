import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateUserService } from '@modules/users/services';

class UsersController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const user = await container.resolve(CreateUserService).execute({
      name,
      email,
      password,
    });

    return response.status(201).json({ user: classToClass(user) });
  }
}

export default new UsersController();
