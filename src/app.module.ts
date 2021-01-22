import { AsyncLocalStorage } from 'async_hooks';
import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetupAsyncContextMiddleware } from './middlewares/setup-async-context.middleware';
import { LoggerService } from './shared/logger/logger.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LOCAL_STORAGE, LOGGER } from './shared/injectionStrings';

const asyncLocalStorage = {
  provide: LOCAL_STORAGE,
  useFactory: () => {
    return new AsyncLocalStorage();
  },
};

const logger = {
  provide: LOGGER,
  useFactory: () => {
    return LoggerService;
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, logger, asyncLocalStorage],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetupAsyncContextMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
