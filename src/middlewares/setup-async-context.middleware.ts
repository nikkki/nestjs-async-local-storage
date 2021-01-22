import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class SetupAsyncContextMiddleware implements NestMiddleware {
  constructor
    (@Inject('LOCAL_STORAGE') private readonly requestContextStorage: AsyncLocalStorage<Map<any, any>>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const store = new Map();
    this.requestContextStorage.run(store, () => {
      next();
    })
  }
}