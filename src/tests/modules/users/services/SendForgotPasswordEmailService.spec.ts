import {
  MockUsersRepository,
  MockUserTokensRepository,
} from '@tests/modules/users/mocks';
import { MockMailProvider } from '@shared/providers/MailProvider/mocks';
import { SendForgotPasswordEmailService } from '@modules/users/services';
import { ApplicationError } from '@shared/errors';

let mockUsersRepository: MockUsersRepository;
let mockUserTokensRepository: MockUserTokensRepository;
let mockMailProvider: MockMailProvider;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockUserTokensRepository = new MockUserTokensRepository();
    mockMailProvider = new MockMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockUserTokensRepository,
      mockMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const sendEmailFunction = jest.spyOn(mockMailProvider, 'sendEmail');

    await sendForgotPasswordEmail.execute({
      email: 'user@email.com',
    });

    expect(sendEmailFunction).toHaveBeenCalled();
  });

  it('should not be able to recover password for a non existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'user@email.com' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });

  it('should generate a forgot password token', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const generateTokenFunction = jest.spyOn(
      mockUserTokensRepository,
      'generate',
    );

    await sendForgotPasswordEmail.execute({
      email: 'user@email.com',
    });

    expect(generateTokenFunction).toHaveBeenCalledWith(user.id);
  });
});
