import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import {
  CreateUserService,
  UpdateUserAvatarService,
} from 'modules/users/services';
import { ensureAuthenticated } from '@modules/users/infra/middlewares';
import { upload as uploadConfig } from '@config/index';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const { user } = await container.resolve(CreateUserService).execute({
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
    const user = await container.resolve(UpdateUserAvatarService).execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json({ ok: true });
  },
);

export default router;
