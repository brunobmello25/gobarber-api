import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';
import authConfig from '../config/auth';
import { ApplicationError } from '../errors/index';

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
