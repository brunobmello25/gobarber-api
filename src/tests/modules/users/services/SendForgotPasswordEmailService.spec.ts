import { MockUsersRepository } from '@tests/modules/users/mocks';
import { MockMailProvider } from '@shared/providers/MailProvider/mocks';
import { SendForgotPasswordEmailService } from '@modules/users/services';
import { ApplicationError } from '@shared/errors';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockMailProvider = new MockMailProvider();

    await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const sendEmailFunction = jest.spyOn(mockMailProvider, 'sendEmail');

    await new SendForgotPasswordEmailService(
      mockUsersRepository,
      mockMailProvider,
    ).execute({
      email: 'user@email.com',
    });

    expect(sendEmailFunction).toHaveBeenCalled();
  });

  it('should not be able to recover password for a non existing user', async () => {
    const mockUsersRepository = new MockUsersRepository();
    const mockMailProvider = new MockMailProvider();

    await expect(
      new SendForgotPasswordEmailService(
        mockUsersRepository,
        mockMailProvider,
      ).execute({ email: 'user@email.com' }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
