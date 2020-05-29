import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();

router.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json({ appointments });
});

router.post('/', async (req, res) => {
  try {
    const { providerId, date } = req.body;

    const parsedDate = parseISO(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
    });

    return res.json({ appointment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
