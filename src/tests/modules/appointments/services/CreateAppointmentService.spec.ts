import { MockAppointmentsRepository } from '@tests/modules/appointments/mocks';
import { CreateAppointmentService } from '@modules/appointments/services';
import { ApplicationError } from '@shared/errors';
import { MockNotificationsRepository } from '@tests/modules/notifications';

let mockNotificationsRepository: MockNotificationsRepository;
let mockAppointmentsRepository: MockAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    mockNotificationsRepository = new MockNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      mockAppointmentsRepository,
      mockNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 11).getTime());

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 12),
      providerId: '123123',
      userId: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 3, 10).getTime());
    const date = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date,
      providerId: '123123',
      userId: '123',
    });

    await expect(
      createAppointment.execute({
        date,
        providerId: '123123',
        userId: '123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        providerId: 'provider',
        userId: 'user',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to create an appointment when user is equal to provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        providerId: 'same-id',
        userId: 'same-id',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 7),
        providerId: 'user-id',
        userId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 18),
        providerId: 'user-id',
        userId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
