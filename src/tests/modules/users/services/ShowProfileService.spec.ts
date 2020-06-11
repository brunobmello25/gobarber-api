import { MockUsersRepository } from '@tests/modules/users/mocks';
import { ShowProfileService } from '@modules/users/services';
import { ApplicationError } from '@shared/errors';

let mockUsersRepository: MockUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();

    showProfile = new ShowProfileService(mockUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await mockUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123123',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile.name).toBe('User');
    expect(profile.email).toBe('user@email.com');
  });

  it('should not able to show the profile of a non existing user', async () => {
    await expect(
      showProfile.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
