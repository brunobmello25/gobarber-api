import { Router } from 'express';

import { appointments } from '@modules/appointments/infra/http/routes';
import { sessions, users, password } from '@modules/users/infra/http/routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/password', password);

export default routes;
