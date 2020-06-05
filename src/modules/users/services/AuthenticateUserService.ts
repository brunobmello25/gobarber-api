import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUsersRepository } from '@modules/users/repositories';
import { User } from '@modules/users/infra/typeorm/entities';
import { auth as authConfig } from '@config/index';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new ApplicationError('Incorrect email/password combination', 401);

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new ApplicationError('Incorrect email/password combination', 401);

    const token = jwt.sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
