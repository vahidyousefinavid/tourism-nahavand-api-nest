import { IsOptional, IsString, IsInt, IsIn, Min, Max, IsObject } from 'class-validator';

export class CreateCreativeCityInitiativeDto {
  @IsObject()
  title: { fa: string; en?: string; ar?: string; zh?: string };

  @IsOptional()
  @IsObject()
  description?: { fa: string; en?: string; ar?: string; zh?: string };

  @IsString()
  sector: string;

  @IsOptional()
  @IsIn(['active', 'ongoing', 'planned', 'completed'])
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  activityLevel?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  participantsCount?: number;

  @IsOptional()
  @IsString()
  startYear?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
