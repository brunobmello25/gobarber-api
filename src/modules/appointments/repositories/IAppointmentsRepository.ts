import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import {
  ICreateAppointmentDTO,
  IFindAllInMonthFromProviderDTO,
} from '@modules/appointments/dtos';

export default interface IAppointmentsRepository {
  find(): Promise<Appointment[]>;

  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
