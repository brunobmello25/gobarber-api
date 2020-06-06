import { container } from 'tsyringe';

import { IStorageProvider } from '@shared/providers/StorageProvider/models';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/implementations';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
