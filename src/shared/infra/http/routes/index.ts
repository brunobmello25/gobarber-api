import { Router } from 'express';

import { appointments } from '@modules/appointments/infra/routes';
import { sessions, users } from '@modules/users/infra/routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
