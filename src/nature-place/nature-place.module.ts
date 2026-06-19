import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaturePlace } from './entities/nature-place.entity';
import { NaturePlaceController } from './nature-place.controller';
import { NaturePlaceService } from './nature-place.service';

@Module({
  imports: [TypeOrmModule.forFeature([NaturePlace])],
  controllers: [NaturePlaceController],
  providers: [NaturePlaceService],
  exports: [NaturePlaceService],
})
export class NaturePlaceModule {}
