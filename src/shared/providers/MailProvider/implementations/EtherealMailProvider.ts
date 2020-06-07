import nodeMailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import { IMailProvider } from '@shared/providers/MailProvider/models';
import { ISendMailDTO } from '@shared/providers/MailProvider/dtos';
import { IMailTemplateProvider } from '@shared/providers/MailTemplateProvider/models';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodeMailer.createTestAccount().then((account) => {
      this.client = nodeMailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const info = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: await this.mailTemplateProvider.parse(templateData),
    });

    console.log(`Email sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodeMailer.getTestMessageUrl(info)}`);
  }
}

export default EtherealMailProvider;
