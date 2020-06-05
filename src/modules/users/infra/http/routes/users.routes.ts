import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { upload as uploadConfig } from '@config/index';
import {
  usersController,
  userAvatarController,
} from '@modules/users/infra/http/controllers';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', usersController.create);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default router;
