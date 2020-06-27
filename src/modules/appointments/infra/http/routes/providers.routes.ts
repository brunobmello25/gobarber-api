import { Router } from 'express';

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
  providerMonthAvailabilityController.index,
);

router.get(
  '/:providerId/day-availability',
  providerDayAvailabilityController.index,
);

export default router;
