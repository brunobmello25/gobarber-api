import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();

const appointmentsRepository = new AppointmentsRepository();

router.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json({ appointments });
});

router.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = parseISO(date);

  try {
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return res.json({ appointment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
