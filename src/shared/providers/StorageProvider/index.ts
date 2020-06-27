import { container } from 'tsyringe';
import { IStorageProvider } from './models';
import { DiskStorageProvider } from './implementations';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
