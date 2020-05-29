import { startOfHour } from 'date-fns';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const isEmailUsed = await this.usersRepository.findOne({
      where: { email },
    });

    if (isEmailUsed) throw new Error('Email address already in use');

    const user = this.usersRepository.create({ name, email, password });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
