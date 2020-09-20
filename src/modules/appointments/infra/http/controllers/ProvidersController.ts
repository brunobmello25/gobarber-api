import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ListProvidersService } from '@modules/appointments/services';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const providers = await container.resolve(ListProvidersService).execute({
      userId,
    });

    return response.json({ providers: classToClass(providers) });
  }
}

export default new ProvidersController();
