import { ObjectID } from 'mongodb';

import { Notification } from '@modules/notifications/infra/typeorm/schemas';
import { INotificationsRepository } from '@modules/notifications/repositories';
import { ICreateNotificationDTO } from '@modules/notifications/dtos';

class MockNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notitication = new Notification();

    Object.assign(notitication, { id: new ObjectID(), content, recipientId });

    this.notifications.push(notitication);

    return notitication;
  }
}

export default MockNotificationsRepository;
