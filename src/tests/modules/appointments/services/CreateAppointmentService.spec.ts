import { MockAppointmentsRepository } from '@tests/modules/appointments/mocks';
import { CreateAppointmentService } from '@modules/appointments/services';
import { ApplicationError } from '@shared/errors';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();

    const appointment = await new CreateAppointmentService(
      mockAppointmentsRepository,
    ).execute({ date: new Date(), providerId: '123123' });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      mockAppointmentsRepository,
    );
    const date = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({ date, providerId: '123123' });

    await expect(
      createAppointmentService.execute({
        date,
        providerId: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
