import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private amqpConnection: AmqpConnection,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('rabbit-publish')
  publisherRabbitMQ(@Body() body) {
    this.amqpConnection.publish('amq.direct', 'pagamentos', body);
    console.log('mensagem publicada');
    return { message: 'mensagem publicada' };
  }
}
