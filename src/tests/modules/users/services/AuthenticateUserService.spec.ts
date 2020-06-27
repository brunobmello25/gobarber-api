import { MockUsersRepository } from '@tests/modules/users/mocks';
import {
  CreateUserService,
  AuthenticateUserService,
} from '@modules/users/services';
import { MockHashProvider } from '@modules/users/providers/HashProvider/mocks';
import { ApplicationError } from '@shared/errors';
import { MockCacheProvider } from '@shared/providers/CacheProvider/mocks';

let mockUsersRepository: MockUsersRepository;
let mockHashProvider: MockHashProvider;
let mockCacheProvider: MockCacheProvider;

let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockHashProvider = new MockHashProvider();
    mockCacheProvider = new MockCacheProvider();

    createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
      mockCacheProvider,
    );
    authenticateUser = new AuthenticateUserService(
      mockUsersRepository,
      mockHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 'user@email.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    expect(
      authenticateUser.execute({
        email: 'user@email.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'user@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
