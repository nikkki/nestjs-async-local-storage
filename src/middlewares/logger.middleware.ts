import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggerService } from '../shared/logger/logger.service';
import { LOCAL_STORAGE } from 'src/shared/injectionStrings';
import { RequestLocalStorage } from 'src/shared/types/async-local-storage.types';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOCAL_STORAGE) private readonly storage: RequestLocalStorage,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const store = this.storage.getStore();
    const traceId = req.headers['x-request-id'];

    const logger = LoggerService.init(traceId as string);

    store.set('logger', logger);

    next();
  }
}
