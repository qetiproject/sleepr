import { Module } from '@nestjs/common';
import { LoggerModule as PinoLogger } from 'nestjs-pino';

@Module({
  imports: [
    PinoLogger.forRoot({
      pinoHttp: {
        level: 'error',
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true, colorize: true },
        },
      },
    }),
  ],
})
export class LoggerModule {}
