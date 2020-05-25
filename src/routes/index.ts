import { Router } from 'express';
import appointments from './appointments';

const routes = Router();

routes.use('/appointments', appointments);

export default routes;
