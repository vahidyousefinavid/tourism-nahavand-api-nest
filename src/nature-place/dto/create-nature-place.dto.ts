import { IsObject, IsString, IsOptional, IsNumber, IsInt, IsBoolean, IsIn, Min } from 'class-validator';
import { NatureCategory, NatureSeason, NatureDifficulty } from '../entities/nature-place.entity';

export class CreateNaturePlaceDto {
  @IsObject()
  name: { fa: string; en?: string; ar?: string; zh?: string };

  @IsString()
  @IsIn(['waterfall', 'river', 'mountain', 'forest', 'valley', 'lake', 'plain', 'spring'])
  category: NatureCategory;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsOptional()
  @IsIn(['spring', 'summer', 'autumn', 'winter', 'all'])
  bestSeason?: NatureSeason;

  @IsOptional()
  @IsNumber()
  @Min(0)
  distanceKm?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  elevationM?: number;

  @IsOptional()
  @IsObject()
  desc?: { fa: string; en?: string; ar?: string; zh?: string };

  @IsOptional()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: NatureDifficulty;

  @IsOptional()
  @IsInt()
  @Min(0)
  trailOrder?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
