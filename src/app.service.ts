export class AppService {
  getHello({ logger }): string {
    logger.log('Hello World Logs');

    return 'Hello World!';
  }
}
