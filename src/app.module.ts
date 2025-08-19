import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { APP_PIPE } from '@nestjs/core';
import { CustomerModule } from './customer/customer.module';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';
import { EventTimeRangeModule } from './event-time-range/event-time-range.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 200,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CustomerModule,
    EventModule,
    LocationModule,
    EventTimeRangeModule,
    UploadModule,
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],

})
export class AppModule { }
