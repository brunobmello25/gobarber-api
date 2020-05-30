import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UsersRepository from '../repositories/UsersRepository';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usersRepository = getCustomRepository(UsersRepository);

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
