import { ListProviderDayAvailabilityService } from '@modules/appointments/services';
import { MockAppointmentsRepository } from '@tests/modules/appointments/mocks';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 14, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 20, 11).getTime());

    const availability = await listProviderDayAvailability.execute({
      providerId: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
