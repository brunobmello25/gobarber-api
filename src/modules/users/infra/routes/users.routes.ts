import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import {
  CreateUserService,
  UpdateUserAvatarService,
} from 'modules/users/services';
import { UsersRepository } from '@modules/users/repositories';
import { ensureAuthenticated } from '@shared/infra/http/middlewares';
import { upload as uploadConfig } from '@config/index';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const usersRepository = getCustomRepository(UsersRepository);

  const { user } = await new CreateUserService(usersRepository).execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.status(201).json({ user });
});

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await new UpdateUserAvatarService(usersRepository).execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json({ ok: true });
  },
);

export default router;
