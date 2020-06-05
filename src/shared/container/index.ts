import { container } from 'tsyringe';

import { IAppointmentsRepository } from '@modules/appointments/repositories';
import { AppointmentsRepository } from '@modules/appointments/infra/typeorm/repositories';

import { IUsersRepository } from '@modules/users/repositories';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
