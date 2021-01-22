import { AsyncLocalStorage } from 'async_hooks';
import { LoggerService } from '../logger/logger.service';

type RequestLocalStorageKeys = {
  logger: LoggerService;
};

export type RequestLocalStorage = AsyncLocalStorage<
  Map<
    keyof RequestLocalStorageKeys,
    RequestLocalStorageKeys[keyof RequestLocalStorageKeys]
  >
>;
