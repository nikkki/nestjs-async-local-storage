import { AsyncLocalStorage } from 'async_hooks';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggerService } from '../shared/logger/logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('LOCAL_STORAGE') private readonly requestContextStorage: AsyncLocalStorage<Map<any, any>>
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const store = this.requestContextStorage.getStore();
    const traceId = req.headers['x-request-id'];

    const logger = LoggerService.init(traceId as string);

    store.set('logger', logger);

    next();
  }
}