import { Controller, Get, Inject } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('LOCAL_STORAGE') private readonly requestContextStorage: AsyncLocalStorage<Map<any, any>>) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
