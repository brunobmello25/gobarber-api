import { MockAppointmentsRepository } from '@tests/appointments/mocks';
import { CreateAppointmentService } from '@modules/appointments/services';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const mockAppointmentsRepository = new MockAppointmentsRepository();

    const appointment = await new CreateAppointmentService(
      mockAppointmentsRepository,
    ).execute({ date: new Date(), providerId: '123123' });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123');
  });

  // it('should not be able to create two appointments on the same time', () => {});
});
