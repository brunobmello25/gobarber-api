import { MockUsersRepository } from '@tests/users/mocks';
import {
  CreateUserService,
  AuthenticateUserService,
} from '@modules/users/services';

describe('CreateAppointment', () => {
  it('should be able to authenticate', async () => {
    const mockUsersRepository = new MockUsersRepository();

    await new CreateUserService(mockUsersRepository).execute({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const response = await new AuthenticateUserService(
      mockUsersRepository,
    ).execute({
      email: 'user@email.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
  });
});
