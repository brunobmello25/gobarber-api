import { hash } from 'bcryptjs';

import { User } from '@modules/users/infra/typeorm/entities';
import { UsersRepository } from '@modules/users/repositories';
import { ApplicationError } from '@shared/errors';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class CreateUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: Request): Promise<Response> {
    const isEmailUsed = await this.usersRepository.findOne({
      where: { email },
    });

    if (isEmailUsed) throw new ApplicationError('Email address already in use');

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return { user };
  }
}

export default CreateUserService;
