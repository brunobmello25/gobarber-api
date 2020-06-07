import { inject, injectable } from 'tsyringe';

import {
  IUsersRepository,
  IUserTokensRepository,
} from '@modules/users/repositories';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new ApplicationError('User token does not exist');

    const user = await this.usersRepository.findById(userToken.userId);
    if (!user) throw new ApplicationError('User does not exist');

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
