import { Router } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '@modules/users/services';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await container
    .resolve(AuthenticateUserService)
    .execute({
      email,
      password,
    });

  delete user.password;

  return res.json({ user, token });
});

export default router;
