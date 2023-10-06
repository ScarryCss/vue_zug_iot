import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import * as _ from 'dotenv'

_.config()

const { APP_URL } = process.env


@WebSocketGateway({
  transports: ['websocket', 'polling'],
  cors: {
    origin: [
      "http://localhost:8080",
      APP_URL.toString()
    ],
    allowedHeaders: [
      'Access-Control-Allow-Origin'
    ],
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}

  index: number = 0;
  
  sensors: any[] = [
    'rfid1',
    'rfid2',
    'rfid3',
    'rfid4',
  ]

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('client connected');
  }

  handleDisconnect(client: any) {
    console.log('client disconnected');
  }

  @SubscribeMessage('events')
  handleEvent(client: Socket, data: any): void {
    this.server.emit('focus', data);
  }

  handleCarSensors() {
    this.index++;
    this.server.emit('car-sensors', {
      tag: this.sensors[this.index % this.sensors.length],
    })
  }
}
