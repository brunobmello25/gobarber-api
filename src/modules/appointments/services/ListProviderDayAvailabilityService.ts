import { injectable, inject } from 'tsyringe';
// import { getDaysInMonth, getDate } from 'date-fns';
import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { getHours, isAfter } from 'date-fns';

interface IRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    day,
    month,
    year,
    providerId,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { day, month, year, providerId },
    );

    const hours = Array.from({ length: 10 }, (_, i) => i + 8);
    const currentDate = new Date(Date.now());

    const availability = hours.map((hour) => {
      const hasAppointmentInHour = appointments.some(
        (a) => getHours(a.date) === hour,
      );

      const expectedDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(expectedDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
