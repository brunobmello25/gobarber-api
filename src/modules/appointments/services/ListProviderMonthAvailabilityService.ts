import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import { IAppointmentsRepository } from '@modules/appointments/repositories';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { providerId, month, year },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const days = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = days.map((day) => {
      const compareDate = new Date(year, month - 1, day, 17, 0, 0);
      const currentDate = new Date(Date.now());

      const appointmentsInDay = appointments.filter(
        (a) => getDate(a.date) === day,
      );

      return {
        day,
        available:
          appointmentsInDay.length < 10 && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
