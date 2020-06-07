import { ISendMailDTO } from '@shared/providers/MailProvider/dtos';

export default interface IMailProvider {
  sendEmail(data: ISendMailDTO): Promise<void>;
}
