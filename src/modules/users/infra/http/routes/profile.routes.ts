import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { profileController } from '@modules/users/infra/http/controllers';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', profileController.show);
router.put('/', profileController.update);

export default router;
