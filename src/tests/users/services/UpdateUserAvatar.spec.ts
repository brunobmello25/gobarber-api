import { MockUsersRepository } from '@tests/users/mocks';
import { UpdateUserAvatarService } from '@modules/users/services';
import MockStorageProvider from '@shared/providers/StorageProvider/mocks/MockStorageProvider';
import { ApplicationError } from '@shared/errors';

describe('UpdateUserAvatar', () => {
  it('should be able update user avatar', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    await new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider,
    ).execute({ userId: user.id, avatarFilename: 'avatar.jpg' });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able update user avatar', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    expect(
      new UpdateUserAvatarService(
        mockUsersRepository,
        mockStorageProvider,
      ).execute({ userId: 'non-existing-user', avatarFilename: 'avatar.jpg' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should delete old avatar when uploading a new one', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockStorageProvider = new MockStorageProvider();

    const deleteFile = jest.spyOn(mockStorageProvider, 'deleteFile');

    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const updateAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider,
    );

    await updateAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
