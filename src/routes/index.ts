import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.send({ ok: true }));

export default routes;
