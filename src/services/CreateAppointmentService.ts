import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface Request {
  date: Date;
  providerId: string;
}

interface Response {
  appointment: Appointment;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ date, providerId }: Request): Promise<Response> {
    const appointmentDate = startOfHour(date);

    const hasAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw new Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    await this.appointmentsRepository.save(appointment);

    return { appointment };
  }
}

export default CreateAppointmentService;
