import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import {
  appointmentsController,
  providerAppointmentsController,
} from '@modules/appointments/infra/http/controllers';

const router = Router();

router.use(ensureAuthenticated);

router.get('/me', providerAppointmentsController.index);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      providerId: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

export default router;
