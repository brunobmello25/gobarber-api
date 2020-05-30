import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const router = Router();
const upload = multer(uploadConfig);

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

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const usersRepository = getCustomRepository(UsersRepository);

      const user = await new UpdateUserAvatarService(usersRepository).execute({
        userId: req.user.id,
        avatarFilename: req.file.filename,
      });

      delete user.password;

      return res.json({ ok: true });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

export default router;
