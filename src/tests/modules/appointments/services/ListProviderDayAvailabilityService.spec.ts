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
    });
    await mockAppointmentsRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      providerId: 'user',
    });

    const availability = await listProviderDayAvailability.execute({
      providerId: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
      ]),
    );
  });
});
