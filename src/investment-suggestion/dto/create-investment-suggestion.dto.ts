import { IsNotEmpty, IsOptional, IsString, IsObject, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateInvestmentSuggestionDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  nationalCode?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  investmentArea?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsObject()
  estimatedAmount?: { amount: number; currency: string };

  @IsOptional()
  @IsString()
  expectedReturn?: string;

  @IsOptional()
  @IsString()
  timeframe?: string;

  @IsOptional()
  @IsString()
  additionalNotes?: string;

  @IsOptional()
  @IsObject()
  latlng?: { lat: number; lng: number };
}
