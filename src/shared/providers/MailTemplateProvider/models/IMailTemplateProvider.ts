import { IParseMailTemplateDTO } from '@shared/providers/MailTemplateProvider/dtos';

export default interface IMailTemplateProvider {
  parse(template: IParseMailTemplateDTO): Promise<string>;
}
