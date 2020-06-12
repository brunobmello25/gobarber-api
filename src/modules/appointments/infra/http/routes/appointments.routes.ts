import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { appointmentsController } from '@modules/appointments/infra/http/controllers';

const router = Router();

router.use(ensureAuthenticated);

router.post('/', appointmentsController.create);

export default router;
