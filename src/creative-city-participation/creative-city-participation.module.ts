import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreativeCityParticipation } from './entities/creative-city-participation.entity';
import { CreativeCityParticipationController } from './creative-city-participation.controller';
import { CreativeCityParticipationService } from './creative-city-participation.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreativeCityParticipation])],
  controllers: [CreativeCityParticipationController],
  providers: [CreativeCityParticipationService],
  exports: [CreativeCityParticipationService],
})
export class CreativeCityParticipationModule {}
