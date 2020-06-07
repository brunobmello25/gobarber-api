import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailService } from '@modules/users/services';

class ForgotPasswordController {
  public async create(request: Request, response: Response) {
    const { email } = request.body;

    await container.resolve(SendForgotPasswordEmailService).execute({ email });

    return response.status(204).json();
  }
}

export default new ForgotPasswordController();
