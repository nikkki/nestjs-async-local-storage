import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { LOCAL_STORAGE } from './shared/injectionStrings';
import { RequestLocalStorage } from './shared/types/async-local-storage.types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(LOCAL_STORAGE) private readonly storage: RequestLocalStorage,
  ) {}

  @Get()
  getHello(): string {
    const logger = this.storage.getStore().get('logger');

    return this.appService.getHello({ logger });
  }
}
