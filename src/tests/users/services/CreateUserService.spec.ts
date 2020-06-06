import { MockUsersRepository } from '@tests/users/mocks';
import { CreateUserService } from '@modules/users/services';
import { ApplicationError } from '@shared/errors';

describe('CreateAppointment', () => {
  it('should be able to create a new user', async () => {
    const mockUsersRepository = new MockUsersRepository();

    const user = await new CreateUserService(mockUsersRepository).execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('User');
    expect(user.email).toBe('user@email.com');
  });

  it('should not be able to create two users with same email', async () => {
    const mockUsersRepository = new MockUsersRepository();

    const createUserService = new CreateUserService(mockUsersRepository);

    await createUserService.execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    expect(
      createUserService.execute({
        name: 'User',
        email: 'user@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
