import { EntityRepository, Repository } from 'typeorm';

import { User } from 'modules/users/infra/typeorm/entities';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export default UsersRepository;
