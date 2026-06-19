import {
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsArray,
  IsString,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InvestmentCategory, RiskLevel, InvestmentStatus } from '../entities/investment.entity';

export class CreateInvestmentDto {
  @IsNotEmpty()
  @IsObject()
  title: { [lang: string]: string };

  @IsNotEmpty()
  @IsObject()
  shortDescription: { [lang: string]: string };

  @IsNotEmpty()
  @IsObject()
  fullDescription: { [lang: string]: string };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  mainImageIndex?: number;

  @IsOptional()
  @IsEnum(InvestmentCategory)
  category?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsObject()
  minInvestment?: { amount: number; currency: string };

  @IsOptional()
  @IsObject()
  maxInvestment?: { amount: number; currency: string };

  @IsOptional()
  @IsString()
  expectedReturn?: string;

  @IsOptional()
  @IsString()
  timeframe?: string;

  @IsOptional()
  @IsEnum(RiskLevel)
  riskLevel?: string;

  @IsOptional()
  @IsObject()
  features?: { [lang: string]: string[] };

  @IsOptional()
  @IsObject()
  requirements?: { [lang: string]: string[] };

  @IsOptional()
  @IsObject()
  benefits?: { [lang: string]: string[] };

  @IsOptional()
  @IsObject()
  contactInfo?: { [lang: string]: string };

  @IsOptional()
  @IsString()
  supportPhone?: string;

  @IsOptional()
  @IsEnum(InvestmentStatus)
  status?: string;

  @IsOptional()
  @IsObject()
  latlng?: { lat: number; lng: number };
}