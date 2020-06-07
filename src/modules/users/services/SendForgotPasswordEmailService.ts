import { inject, injectable } from 'tsyringe';

import {
  IUsersRepository,
  IUserTokensRepository,
} from '@modules/users/repositories';
import { IMailProvider } from '@shared/providers/MailProvider/models';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new ApplicationError('User does not exist');

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendEmail({
      to: { name: user.name, email: user.email },
      subject: 'Recuperação de Senha',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
