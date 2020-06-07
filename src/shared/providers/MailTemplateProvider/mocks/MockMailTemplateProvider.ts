import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models';

class MockMailTemplateProvider implements IMailTemplateProvider {
  async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default MockMailTemplateProvider;
