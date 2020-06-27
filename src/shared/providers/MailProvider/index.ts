import { container } from 'tsyringe';
import { IMailProvider } from './models';
import { EtherealMailProvider } from './implementations';

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
