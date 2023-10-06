import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SocketGateway } from './websocket/websocket.gateway';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Cron('*/10 * * * * *')
  handleCarSensors() {
    this.socketGateway.handleCarSensors();
  }
}
