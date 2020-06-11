import { MockUsersRepository } from '@tests/modules/users/mocks';
import { UpdateProfileService } from '@modules/users/services';
import { MockHashProvider } from '@modules/users/providers/HashProvider/mocks';
import { IHashProvider } from '@modules/users/providers/HashProvider/models';
import { ApplicationError } from '@shared/errors';

let mockUsersRepository: MockUsersRepository;
let mockHashProvider: IHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockHashProvider = new MockHashProvider();

    updateProfile = new UpdateProfileService(
      mockUsersRepository,
      mockHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'Updated User',
      email: 'updated@email.com',
    });

    expect(updatedUser.name).toBe('Updated User');
    expect(updatedUser.email).toBe('updated@email.com');
  });

  it('should not be able to update the a non existing user profile', async () => {
    await expect(
      updateProfile.execute({
        userId: 'non-existing-id',
        name: 'Updated User',
        email: 'updated@email.com',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to update email to an email that already exists', async () => {
    await mockUsersRepository.create({
      name: 'User1',
      email: 'user1@email.com',
      password: '123123',
    });
    const user2 = await mockUsersRepository.create({
      name: 'User2',
      email: 'user2@email.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        userId: user2.id,
        name: user2.name,
        email: 'user1@email.com',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should be able to update the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'Updated User',
      email: 'updated@email.com',
      oldPassword: '123123',
      password: 'updated-password',
    });

    expect(updatedUser.name).toBe('Updated User');
    expect(updatedUser.email).toBe('updated@email.com');
    expect(updatedUser.password).toBe('updated-password');
  });

  it('should not be able to update the password without providing old password', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Updated User',
        email: 'updated@email.com',
        password: 'updated-password',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to update the password when providing wrong password', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'Updated User',
        email: 'updated@email.com',
        oldPassword: 'wrong-old-password',
        password: 'updated-password',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
