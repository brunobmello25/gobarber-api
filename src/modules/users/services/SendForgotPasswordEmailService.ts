import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories';
import { IMailProvider } from '@shared/providers/MailProvider/models';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new ApplicationError('User does not exist');

    this.mailProvider.sendEmail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
