import { Router } from 'express';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories';
import { AuthenticateUserService } from '@modules/users/services';

const router = Router();

const usersRepository = new UsersRepository();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await new AuthenticateUserService(
    usersRepository,
  ).execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default router;
