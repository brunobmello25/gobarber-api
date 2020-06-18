import { MockAppointmentsRepository } from '@tests/modules/appointments/mocks';
import { CreateAppointmentService } from '@modules/appointments/services';
import { ApplicationError } from '@shared/errors';

let mockAppointmentsRepository: MockAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '123123',
      userId: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
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
});
