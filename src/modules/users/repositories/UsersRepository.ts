import { EntityRepository, Repository } from 'typeorm';

import { User } from 'modules/users/entities';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export default UsersRepository;
