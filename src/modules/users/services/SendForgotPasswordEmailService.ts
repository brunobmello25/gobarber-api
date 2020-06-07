import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({}: IRequest): Promise<void> {}
}

export default SendForgotPasswordEmailService;
