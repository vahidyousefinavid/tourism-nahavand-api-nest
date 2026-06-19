import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreativeCityInitiative } from './entities/creative-city-initiative.entity';
import { CreativeCityInitiativeController } from './creative-city-initiative.controller';
import { CreativeCityInitiativeService } from './creative-city-initiative.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreativeCityInitiative])],
  controllers: [CreativeCityInitiativeController],
  providers: [CreativeCityInitiativeService],
  exports: [CreativeCityInitiativeService],
})
export class CreativeCityInitiativeModule {}
