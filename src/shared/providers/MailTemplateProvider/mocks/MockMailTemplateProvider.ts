import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models';
import { IParseMailTemplateDTO } from '@shared/providers/MailTemplateProvider/dtos';

class MockMailTemplateProvider implements IMailTemplateProvider {
  async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default MockMailTemplateProvider;
