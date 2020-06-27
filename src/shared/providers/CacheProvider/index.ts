import { container } from 'tsyringe';
import { ICacheProvider } from './models';
import { RedisCacheProvider } from './implementations';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider,
);
