import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { appointmentsController } from '@modules/appointments/infra/http/controllers';

const router = Router();

router.use(ensureAuthenticated);

// router.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json({ appointments });
// });

router.post('/', appointmentsController.create);

export default router;
