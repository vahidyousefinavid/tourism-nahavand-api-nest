import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsNumberString, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: Date, format: 'date' })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ description: 'Location coordinate as bigint string' })
  @IsNotEmpty()
  @IsNumberString()
  location: string;  // چون تو Entity bigint هست، اینجا به عنوان رشته عددی کنترل می‌کنیم

  @ApiProperty({ description: 'Unique latitude and longitude string' })
  @IsNotEmpty()
  @IsString()
  latlang: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  capacity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  registered: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organizer: string;
}
