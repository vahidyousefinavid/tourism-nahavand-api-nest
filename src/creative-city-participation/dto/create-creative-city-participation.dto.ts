import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateCreativeCityParticipationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  ageGroup?: string;

  @IsNotEmpty()
  @IsString()
  domain: string;

  @IsNotEmpty()
  @IsString()
  ideaTitle: string;

  @IsNotEmpty()
  @IsString()
  ideaDesc: string;

  @IsOptional()
  @IsArray()
  participation?: string[];
}
