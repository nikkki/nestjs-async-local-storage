export class LoggerService {
  private id: number | string;

  public constructor(correlationId?: number | string) {
    this.id = correlationId ? correlationId : this.getDefaultCorrelationId();
  }

  private getDefaultCorrelationId() {
    return '123';
  }

  public static init(correlationId: number | string) {
    return new LoggerService(correlationId);
  }

  public log(...args) {
    console.log(...args, {
      correlationId: this.id,
    });
  }
}
