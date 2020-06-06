import { MockUsersRepository } from '@tests/users/mocks';
import {
  CreateUserService,
  AuthenticateUserService,
} from '@modules/users/services';
import { MockHashProvider } from '@modules/users/providers/HashProvider/mocks';
import { ApplicationError } from '@shared/errors';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    const user = await new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
    ).execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const response = await new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider,
    ).execute({
      email: 'user@email.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    await new CreateUserService(mockUsersRepository, mockHashProvider).execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    expect(
      new AuthenticateUserService(
        mockUsersRepository,
        mockHashProvider,
      ).execute({
        email: 'user@email.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockHashProvider = new MockHashProvider();

    expect(
      new AuthenticateUserService(
        mockUsersRepository,
        mockHashProvider,
      ).execute({
        email: 'user@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
