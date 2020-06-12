import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { providersController } from '@modules/appointments/infra/http/controllers';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', providersController.index);

export default router;
