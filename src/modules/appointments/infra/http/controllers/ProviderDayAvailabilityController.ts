import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderDayAvailabilityService } from '@modules/appointments/services';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { day, month, year } = request.body;

    const providers = await container
      .resolve(ListProviderDayAvailabilityService)
      .execute({
        day,
        month,
        year,
        providerId,
      });

    return response.json({ providers });
  }
}

export default new ProviderDayAvailabilityController();
