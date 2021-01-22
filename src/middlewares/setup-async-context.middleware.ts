import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LOCAL_STORAGE } from 'src/shared/injectionStrings';
import { RequestLocalStorage } from 'src/shared/types/async-local-storage.types';

@Injectable()
export class SetupAsyncContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOCAL_STORAGE) private readonly storage: RequestLocalStorage,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const store = new Map();
    this.storage.run(store, () => {
      next();
    });
  }
}
