import { container } from 'tsyringe';

import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
