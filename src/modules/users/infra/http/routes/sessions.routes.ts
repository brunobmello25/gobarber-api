import { Router } from 'express';

import { sessionsController } from '@modules/users/infra/http/controllers';
import { celebrate, Segments, Joi } from 'celebrate';

const router = Router();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default router;
