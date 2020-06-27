import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import {
  appointmentsController,
  providerAppointmentsController,
} from '@modules/appointments/infra/http/controllers';

const router = Router();

router.use(ensureAuthenticated);

router.get('/me', providerAppointmentsController.index);

router.post('/', appointmentsController.create);

export default router;
