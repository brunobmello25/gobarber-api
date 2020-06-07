import { IMailProvider } from '@shared/providers/MailProvider/models';

interface IMessage {
  to: string;
  body: string;
}

class MockMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  async sendEmail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}

export default MockMailProvider;
