import { MockUsersRepository } from '@tests/modules/users/mocks';
import { MockMailProvider } from '@shared/providers/MailProvider/mocks';
import { SendForgotPasswordEmailService } from '@modules/users/services';

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

    await new SendForgotPasswordEmailService(mockUsersRepository).execute({
      email: 'user@email.com',
    });

    expect(sendEmailFunction).toHaveBeenCalled();
  });
});
