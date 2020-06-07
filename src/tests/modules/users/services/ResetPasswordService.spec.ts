import {
  MockUsersRepository,
  MockUserTokensRepository,
} from '@tests/modules/users/mocks';
import { ResetPasswordService } from '@modules/users/services';
import { MockHashProvider } from '@modules/users/providers/HashProvider/mocks';
import { ApplicationError } from '@shared/errors';

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

  it('should not be able to reset password with non existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to reset password with non existing user', async () => {
    const { token } = await mockUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should not be able to reset password after two hours of token creation', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: 'old-password',
    });
    const { token } = await mockUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ token, password: 'new-password' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
