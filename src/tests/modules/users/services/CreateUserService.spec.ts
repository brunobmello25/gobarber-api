import { MockUsersRepository } from '@tests/modules/users/mocks';
import { CreateUserService } from '@modules/users/services';
import { ApplicationError } from '@shared/errors';
import { MockHashProvider } from '@modules/users/providers/HashProvider/mocks';
import { MockCacheProvider } from '@shared/providers/CacheProvider/mocks';

let mockUsersRepository: MockUsersRepository;
let mockHashProvider: MockHashProvider;
let mockCacheProvider: MockCacheProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockHashProvider = new MockHashProvider();
    mockCacheProvider = new MockCacheProvider();

    createUser = new CreateUserService(
      mockUsersRepository,
      mockHashProvider,
      mockCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('User');
    expect(user.email).toBe('user@email.com');
  });

  it('should not be able to create two users with same email', async () => {
    await createUser.execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'User',
        email: 'user@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
