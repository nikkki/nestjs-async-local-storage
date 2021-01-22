import { AsyncLocalStorage } from 'async_hooks';
import { Module, MiddlewareConsumer, Provider } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetupAsyncContextMiddleware } from './middlewares/setup-async-context.middleware';
import { LoggerService } from './shared/logger/logger.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

const asyncLocalStorage = {
  provide: 'LOCAL_STORAGE',
  useFactory: () => {
    return new AsyncLocalStorage();
  }
}

const logger = {
  provide: 'LOGGER',
  useFactory: () => {
    return LoggerService;
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, logger, asyncLocalStorage],
})
export class AppModule {
  configure(userContext: MiddlewareConsumer) {
    userContext.apply(SetupAsyncContextMiddleware).forRoutes("*");
    userContext.apply(LoggerMiddleware).forRoutes("*");
  }
}
