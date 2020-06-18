import { getRepository, Repository, Raw } from 'typeorm';

import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {
  ICreateAppointmentDTO,
  IFindAllInMonthFromProviderDTO,
} from '@modules/appointments/dtos';

class AppointmentsRepository implements IAppointmentsRepository {
  private repository: Repository<Appointment>;

  constructor() {
    this.repository = getRepository(Appointment);
  }

  public async find(): Promise<Appointment[]> {
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

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const monthWithTwoDigits = month.toString().padStart(2, '0');

    const appointments = this.repository.find({
      where: {
        providerId,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${monthWithTwoDigits}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}

export default AppointmentsRepository;
