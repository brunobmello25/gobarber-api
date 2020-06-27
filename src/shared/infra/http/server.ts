import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';
import { upload as uploadConfig } from '@config/index';
import { ApplicationError } from '@shared/errors';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(celebrateErrors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => console.log('Listening on port 3333'));
