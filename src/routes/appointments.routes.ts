import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const router = Router();

const appointments: Appointment[] = [];

router.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const hasAppointmentInSameDate = appointments.find((appointment) =>
    isEqual(appointment.date, parsedDate),
  );

  if (hasAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, date);

  appointments.push(appointment);

  return res.json({ appointment });
});

export default router;
