import { Module, ValidationPipe } from '@nestjs/common';
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
import { InvestmentModule } from './investment/investment.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 200,
      verboseMemoryLeak: false,
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
    InvestmentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
