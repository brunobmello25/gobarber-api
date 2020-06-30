import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { Appointment } from '@modules/appointments/infra/typeorm/entities';
import { ICacheProvider } from '@shared/providers/CacheProvider/models';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    providerId,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}-${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.fetch<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          day,
          month,
          year,
          providerId,
        },
      );

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
