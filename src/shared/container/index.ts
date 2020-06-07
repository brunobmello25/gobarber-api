import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/providers';

import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories';

import {
  IUsersRepository,
  IUserTokensRepository,
} from '@modules/users/repositories';

import {
  UsersRepository,
  UserTokensRepository,
} from '@modules/users/infra/typeorm/repositories';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
