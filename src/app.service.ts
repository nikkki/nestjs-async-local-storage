import { Inject, Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestLocalStorage } from './shared/types/async-local-storage.types';

@Injectable()
export class AppService {
  public constructor(
    @Inject('LOCAL_STORAGE') private readonly requestContextStorage: RequestLocalStorage
  ) { }

  getHello(): string {
    const store = this.requestContextStorage.getStore();
    const logger = store.get('logger');
    
    logger.log('something');

    return 'Hello World!';
  }
}
