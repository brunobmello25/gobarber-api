import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  date: Date;
  providerId: string;
}

interface IResponse {
  appointment: Appointment;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, providerId }: IRequest): Promise<IResponse> {
    const appointmentDate = startOfHour(date);

    const hasAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw new ApplicationError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    return { appointment };
  }
}

export default CreateAppointmentService;
