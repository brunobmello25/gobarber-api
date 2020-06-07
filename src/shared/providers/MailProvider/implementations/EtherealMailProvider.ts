import nodeMailer, { Transporter } from 'nodemailer';
import { IMailProvider } from '@shared/providers/MailProvider/models';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
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

  async sendEmail(to: string, body: string): Promise<void> {
    const info = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de Senha',
      text: body,
    });

    console.log(`Email sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodeMailer.getTestMessageUrl(info)}`);
  }
}

export default EtherealMailProvider;
