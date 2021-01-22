export class AppService {
  getHello({ logger }): string {
    logger.log('something');

    return 'Hello World!';
  }
}
