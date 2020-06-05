import { Router } from 'express';

import { sessionsController } from '@modules/users/infra/http/controllers';

const router = Router();

router.post('/', sessionsController.create);

export default router;
