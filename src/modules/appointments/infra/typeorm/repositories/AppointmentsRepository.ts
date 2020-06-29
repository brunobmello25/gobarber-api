import { getRepository, Repository, Raw } from 'typeorm';

import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {
  ICreateAppointmentDTO,
  IFindAllInMonthFromProviderDTO,
  IFindAllInDayFromProviderDTO,
  IFindByDateAndProviderDTO,
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
    userId,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.repository.create({ date, providerId, userId });
    await this.repository.save(appointment);
    return appointment;
  }

  public async findByDate({
    date,
    providerId,
  }: IFindByDateAndProviderDTO): Promise<Appointment | undefined> {
    const appointment = await this.repository.findOne({
      where: { date, providerId },
    });

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

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const dayWithTwoDigits = day.toString().padStart(2, '0');
    const monthWithTwoDigits = month.toString().padStart(2, '0');

    const appointments = this.repository.find({
      where: {
        providerId,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${dayWithTwoDigits}-${monthWithTwoDigits}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}

export default AppointmentsRepository;
