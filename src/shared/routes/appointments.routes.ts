import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { ensureAuthenticated } from 'shared/middlewares';
import { CreateAppointmentService } from 'modules/appointments/services';
import { AppointmentsRepository } from 'modules/appointments/repositories';

const router = Router();

router.use(ensureAuthenticated);

router.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json({ appointments });
});

router.post('/', async (req, res) => {
  const { providerId, date } = req.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const { appointment } = await createAppointment.execute({
    date: parsedDate,
    providerId,
  });

  return res.json({ appointment });
});

export default router;
