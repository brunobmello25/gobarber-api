import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const hasAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw new Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
