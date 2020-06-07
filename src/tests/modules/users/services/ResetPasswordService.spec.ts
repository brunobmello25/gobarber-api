import {
  MockUsersRepository,
  MockUserTokensRepository,
} from '@tests/modules/users/mocks';
import { ResetPasswordService } from '@modules/users/services';

let mockUsersRepository: MockUsersRepository;
let mockUserTokensRepository: MockUserTokensRepository;

let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();

    resetPassword = new ResetPasswordService(
      mockUsersRepository,
      mockUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: 'old-password',
    });
    const { token } = await mockUserTokensRepository.generate(user.id);

    await resetPassword.execute({ token, password: 'new-password' });

    expect(user.password).toBe('new-password');
  });
});
