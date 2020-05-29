import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const { user } = await new CreateUserService(usersRepository).execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
