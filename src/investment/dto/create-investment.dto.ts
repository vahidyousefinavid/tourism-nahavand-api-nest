import {
  IsObject,
  IsOptional,
  IsNumber,
  IsArray,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateInvestmentOpportunityDto {
  @IsNotEmpty()
  @IsObject()
  title: Record<string, string>;

  @IsNotEmpty()
  @IsObject()
  description: Record<string, string>;

  @IsObject()
  category: Record<string, string>;

  @IsObject()
  location: {
    address: Record<string, string>;
    city: Record<string, string>;
    province: Record<string, string>;
    lat?: number;
    lng?: number;
  };

  @IsNumber()
  requiredInvestment: number;

  @IsObject()
  roi: Record<string, string>;

  @IsObject()
  returnPeriod: Record<string, string>;

  @IsObject()
  status: Record<string, string>;

  @IsObject()
  legalInfo: {
    ownerName: Record<string, string>;
    permits: Record<string, string[]>;
    registrationNumber?: string;
  };

  @IsOptional()
  @IsObject()
  landInfo?: {
    type: Record<string, string>;
    documentStatus: Record<string, string>;
    area: number;
  };

  @IsOptional()
  benefits?: Record<string, string[]>;

  @IsOptional()
  risks?: Record<string, string[]>;

  @IsOptional()
  technicalInfo?: Record<string, string[]>;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsArray()
  attachments?: string[];
}
