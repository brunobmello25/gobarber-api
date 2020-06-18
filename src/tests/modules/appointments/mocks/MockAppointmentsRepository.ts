import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {
  ICreateAppointmentDTO,
  IFindAllInMonthFromProviderDTO,
} from '@modules/appointments/dtos';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  async find(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async create({
    date,
    providerId,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, providerId });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    );
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }
}

export default AppointmentsRepository;
