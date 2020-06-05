import { Router } from 'express';
import { parseISO } from 'date-fns';

import { ensureAuthenticated } from '@modules/users/infra/middlewares';
import { CreateAppointmentService } from '@modules/appointments/services';
import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories';

const router = Router();
const appointmentsRepository = new AppointmentsRepository();

router.use(ensureAuthenticated);

router.get('/', async (req, res) => {
  const appointments = await appointmentsRepository.find();

  return res.json({ appointments });
});

router.post('/', async (req, res) => {
  const { providerId, date } = req.body;

  const parsedDate = parseISO(date);

  const { appointment } = await new CreateAppointmentService(
    appointmentsRepository,
  ).execute({
    date: parsedDate,
    providerId,
  });

  return res.json({ appointment });
});

export default router;
