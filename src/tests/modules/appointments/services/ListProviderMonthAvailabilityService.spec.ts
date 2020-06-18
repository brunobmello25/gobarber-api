import { ListProviderMonthAvailabilityService } from '@modules/appointments/services';
import { MockAppointmentsRepository } from '@tests/modules/appointments/mocks';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 9, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 11, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 12, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 13, 0, 0),
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
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 16, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 17, 0, 0),
      providerId: 'user',
      userId: 'user',
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 21, 8, 0, 0),
      providerId: 'user',
      userId: 'user',
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
      ]),
    );
  });
});
