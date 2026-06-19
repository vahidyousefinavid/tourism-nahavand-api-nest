import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreativeCityNews } from './entities/creative-city-news.entity';
import { CreativeCityNewsController } from './creative-city-news.controller';
import { CreativeCityNewsService } from './creative-city-news.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreativeCityNews])],
  controllers: [CreativeCityNewsController],
  providers: [CreativeCityNewsService],
  exports: [CreativeCityNewsService],
})
export class CreativeCityNewsModule {}
