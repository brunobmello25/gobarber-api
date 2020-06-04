import { startOfHour } from 'date-fns';

import { AppointmentsRepository } from '@modules/appointments/repositories';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  date: Date;
  providerId: string;
}

interface IResponse {
  appointment: Appointment;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ date, providerId }: IRequest): Promise<IResponse> {
    const appointmentDate = startOfHour(date);

    const hasAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw new ApplicationError('This appointment is already booked');
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
