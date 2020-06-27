import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { INotificationsRepository } from '@modules/notifications/repositories';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  date: Date;
  providerId: string;
  userId: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    date,
    providerId,
    userId,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now()))
      throw new ApplicationError("Can't create an appointment on the past");

    if (userId === providerId)
      throw new ApplicationError("Can't create an appointment with yourself");

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new ApplicationError(
        "Can't create an appointment before 8am or after 5pm",
      );

    const hasAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (hasAppointmentInSameDate) {
      throw new ApplicationError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate,
    });

    const formatedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento no dia ${formatedDate}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
