import { Router } from 'express';

import { appointments } from '@modules/appointments/infra/http/routes';
import { sessions, users } from '@modules/users/infra/http/routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
