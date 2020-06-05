import { getRepository, Repository } from 'typeorm';

import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { ICreateAppointmentDTO } from '@modules/appointments/dtos';

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  find(): Promise<Appointment[]> {
    return this.repository.find();
  }

  public async create({
    date,
    providerId,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.repository.create({ date, providerId });
    await this.repository.save(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.repository.findOne({ where: { date } });

    return appointment;
  }
}

export default AppointmentsRepository;
