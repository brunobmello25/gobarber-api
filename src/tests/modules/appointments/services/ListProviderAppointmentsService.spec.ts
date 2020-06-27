import { ListProviderAppointmentsService } from '@modules/appointments/services';
import { MockAppointmentsRepository } from '@tests/modules/appointments/mocks';
import { MockCacheProvider } from '@shared/providers/CacheProvider/mocks';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let mockCacheProvider: MockCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    mockCacheProvider = new MockCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      mockAppointmentsRepository,
      mockCacheProvider,
    );
  });

  it('should be able to list provider appointments on a specific day', async () => {
    const appointment1 = await mockAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointment2 = await mockAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      providerId: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
