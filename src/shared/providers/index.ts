import { container } from 'tsyringe';

import { IStorageProvider } from '@shared/providers/StorageProvider/models';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/implementations';

import { IMailProvider } from '@shared/providers/MailProvider/models';
import { EtherealMailProvider } from '@shared/providers/MailProvider/implementations';

import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models';
import { HandlebarsMailTemplateProvider } from '@shared/providers/MailTemplateProvider/implementations';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
