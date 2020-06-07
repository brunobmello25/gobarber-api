import { Router } from 'express';

import {
  forgotPasswordController,
  resetPasswordController,
} from '@modules/users/infra/http/controllers';

const router = Router();

router.post('/forgot', forgotPasswordController.create);
router.post('/reset', resetPasswordController.create);

export default router;
