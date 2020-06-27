import { Notification } from '@modules/notifications/infra/typeorm/schemas';
import { ICreateNotificationDTO } from '@modules/notifications/dtos';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
