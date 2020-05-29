import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email/password combination');

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new Error('Incorrect email/password combination');

    // TODO: change jwt sign private key and move it to a secret config file
    const token = jwt.sign({}, 'e0ab2eeba535bc7aede62c46ee19ae33', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
