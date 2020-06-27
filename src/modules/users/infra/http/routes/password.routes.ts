import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import {
  forgotPasswordController,
  resetPasswordController,
} from '@modules/users/infra/http/controllers';

const router = Router();

router.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPasswordController.create,
);
router.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default router;
