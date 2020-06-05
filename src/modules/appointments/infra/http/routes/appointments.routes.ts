import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares';
import { CreateAppointmentService } from '@modules/appointments/services';

const router = Router();

router.use(ensureAuthenticated);

// router.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json({ appointments });
// });

router.post('/', async (req, res) => {
  const { providerId, date } = req.body;

  const parsedDate = parseISO(date);

  const { appointment } = await container
    .resolve(CreateAppointmentService)
    .execute({
      date: parsedDate,
      providerId,
    });

  return res.json({ appointment });
});

export default router;
