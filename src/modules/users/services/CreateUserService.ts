import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities';
import { IUsersRepository } from '@modules/users/repositories';
import { ApplicationError } from '@shared/errors';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const isEmailUsed = await this.usersRepository.findByEmail(email);

    if (isEmailUsed) throw new ApplicationError('Email address already in use');

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return { user };
  }
}

export default CreateUserService;
