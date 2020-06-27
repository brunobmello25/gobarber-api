import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import {
  providersController,
  providerDayAvailabilityController,
  providerMonthAvailabilityController,
} from '@modules/appointments/infra/http/controllers';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', providersController.index);

router.get(
  '/:providerId/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);

router.get(
  '/:providerId/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

export default router;
