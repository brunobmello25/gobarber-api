import { uuid } from 'uuidv4';

import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos';

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
    return this.appointments.find((appointment) => appointment.date === date);
  }
}

export default AppointmentsRepository;
