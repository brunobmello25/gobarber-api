import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '@modules/appointments/services';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;
    const userId = request.user.id;

    const appointment = await container
      .resolve(CreateAppointmentService)
      .execute({
        date,
        providerId,
        userId,
      });

    return response.json({ appointment });
  }
}

export default new AppointmentsController();
