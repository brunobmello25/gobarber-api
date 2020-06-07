import {
  MockUsersRepository,
  MockUserTokensRepository,
} from '@tests/modules/users/mocks';
import { ResetPasswordService } from '@modules/users/services';
import { MockHashProvider } from '@modules/users/providers/HashProvider/mocks';

let mockUsersRepository: MockUsersRepository;
let mockUserTokensRepository: MockUserTokensRepository;
let hashProvider: MockHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();
    hashProvider = new MockHashProvider();

    resetPassword = new ResetPasswordService(
      mockUsersRepository,
      mockUserTokensRepository,
      hashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: 'old-password',
    });
    const { token } = await mockUserTokensRepository.generate(user.id);
    const hashFunction = jest.spyOn(hashProvider, 'generateHash');

    await resetPassword.execute({ token, password: 'new-password' });

    expect(hashFunction).toHaveBeenCalledWith('new-password');
    expect(user.password).toBe('new-password');
  });
});
