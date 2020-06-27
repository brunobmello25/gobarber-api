import { getMongoRepository, MongoRepository } from 'typeorm';

import { Notification } from '@modules/notifications/infra/typeorm/schemas';
import { INotificationsRepository } from '@modules/notifications/repositories';
import { ICreateNotificationDTO } from '@modules/notifications/dtos';

class NotificationsRepository implements INotificationsRepository {
  private repository: MongoRepository<Notification>;

  constructor() {
    this.repository = getMongoRepository(Notification, 'mongo');
  }

  async create({
    content,
    recipientId,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.repository.create({ content, recipientId });

    await this.repository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
