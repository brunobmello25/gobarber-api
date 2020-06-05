import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '@modules/appointments/services';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;

    const parsedDate = parseISO(date);

    const { appointment } = await container
      .resolve(CreateAppointmentService)
      .execute({
        date: parsedDate,
        providerId,
      });

    return response.json({ appointment });
  }
}

export default new AppointmentsController();
