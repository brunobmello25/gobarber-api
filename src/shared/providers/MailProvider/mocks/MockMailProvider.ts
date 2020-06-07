import { IMailProvider } from '@shared/providers/MailProvider/models';
import { ISendMailDTO } from '@shared/providers/MailProvider/dtos';

class MockMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  async sendEmail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default MockMailProvider;
