import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { upload as uploadConfig } from '@config/index';
import {
  usersController,
  userAvatarController,
} from '@modules/users/infra/http/controllers';
import { celebrate, Segments, Joi } from 'celebrate';

const router = Router();
const upload = multer(uploadConfig);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default router;
