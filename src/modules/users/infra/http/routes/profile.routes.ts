import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { profileController } from '@modules/users/infra/http/controllers';
import { celebrate, Segments, Joi } from 'celebrate';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', profileController.show);
router.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.when('oldPassword', {
        is: Joi.exist(),
        then: Joi.string().required(),
        otherwise: Joi.string(),
      }),
      passwordConfirmation: Joi.when('oldPassword', {
        is: Joi.exist(),
        then: Joi.string().required().valid(Joi.ref('password')),
        otherwise: Joi.string(),
      }),
    },
  }),
  profileController.update,
);

export default router;
