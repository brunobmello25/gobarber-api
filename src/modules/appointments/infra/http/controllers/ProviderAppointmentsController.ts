import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderAppointmentsService } from '@modules/appointments/services';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;
    const { day, month, year } = request.query;

    const appointments = await container
      .resolve(ListProviderAppointmentsService)
      .execute({
        day: Number(day),
        month: Number(month),
        year: Number(year),
        providerId,
      });

    return response.json({ appointments });
  }
}

export default new ProviderAppointmentsController();
