import { container } from 'tsyringe';

import { IStorageProvider } from '@shared/providers/StorageProvider/models';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/implementations';

import { IMailProvider } from '@shared/providers/MailProvider/models';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
