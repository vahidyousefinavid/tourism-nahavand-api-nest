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
import { InvestmentSuggestionModule } from './investment-suggestion/investment-suggestion.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CreativeCityNewsModule } from './creative-city-news/creative-city-news.module';
import { CreativeCityParticipationModule } from './creative-city-participation/creative-city-participation.module';
import { CreativeCityInitiativeModule } from './creative-city-initiative/creative-city-initiative.module';
import { NaturePlaceModule } from './nature-place/nature-place.module';

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
    InvestmentSuggestionModule,
    UserModule,
    AuthModule,
    CreativeCityNewsModule,
    CreativeCityParticipationModule,
    CreativeCityInitiativeModule,
    NaturePlaceModule,
  ],
  controllers: [AppController, UploadController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
