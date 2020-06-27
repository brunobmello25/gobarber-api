import { container } from 'tsyringe';
import { IMailTemplateProvider } from './models';
import { HandlebarsMailTemplateProvider } from './implementations';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
