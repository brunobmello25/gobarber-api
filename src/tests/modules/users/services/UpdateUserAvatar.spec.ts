import { MockUsersRepository } from '@tests/modules/users/mocks';
import { UpdateUserAvatarService } from '@modules/users/services';
import MockStorageProvider from '@shared/providers/StorageProvider/mocks/MockStorageProvider';
import { ApplicationError } from '@shared/errors';

let mockUsersRepository: MockUsersRepository;
let mockStorageProvider: MockStorageProvider;

let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockStorageProvider = new MockStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      mockUsersRepository,
      mockStorageProvider,
    );
  });

  it('should be able update user avatar', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able update user avatar', async () => {
    await expect(
      updateUserAvatar.execute({
        userId: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should delete old avatar when uploading a new one', async () => {
    const deleteFile = jest.spyOn(mockStorageProvider, 'deleteFile');

    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
