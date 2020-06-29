import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProviderMonthAvailabilityService } from '@modules/appointments/services';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { month, year } = request.query;

    const availability = await container
      .resolve(ListProviderMonthAvailabilityService)
      .execute({
        providerId,
        month: Number(month),
        year: Number(year),
      });

    return response.json({ availability });
  }
}

export default new ProviderMonthAvailabilityController();
