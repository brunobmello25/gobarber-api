import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import appointmentsRepository from '../repositories/AppointmentsRepository';

const router = Router();

router.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json({ appointments });
});

router.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const hasAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (hasAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return res.json({ appointment });
});

export default router;
