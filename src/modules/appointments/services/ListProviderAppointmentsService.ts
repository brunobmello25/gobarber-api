import { injectable, inject } from 'tsyringe';
import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { day, month, year, providerId },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
