import { MockUsersRepository } from '@tests/modules/users/mocks';
import { ListProvidersService } from '@modules/appointments/services';

let mockUsersRepository: MockUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    listProviders = new ListProvidersService(mockUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await mockUsersRepository.create({
      name: 'User1',
      email: 'user1@email.com',
      password: '123123',
    });
    const user2 = await mockUsersRepository.create({
      name: 'User2',
      email: 'user2@email.com',
      password: '123123',
    });
    const loggedUser = await mockUsersRepository.create({
      name: 'Logged User',
      email: 'logged@email.com',
      password: '123123',
    });

    const providers = await listProviders.execute({ userId: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
