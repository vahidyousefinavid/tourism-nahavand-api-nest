import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsArray, ArrayNotEmpty, IsNumber, Min, Max, IsInt, IsObject, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Localized names', example: { fa: 'نام فارسی', en: 'English Name' } })
  @IsNotEmpty()
  @IsObject()
  name: Record<string, string>;

  @ApiProperty({ description: 'Localized descriptions', example: { fa: 'توضیحات فارسی', en: 'English Description' } })
  @IsNotEmpty()
  @IsObject()
  description: Record<string, string>;

  @ApiProperty({ enum: ['historical', 'natural', 'cultural', 'religious'] })
  @IsNotEmpty()
  @IsEnum(['historical', 'natural', 'cultural', 'religious'])
  category: 'historical' | 'natural' | 'cultural' | 'religious';

  @ApiProperty({ type: [String], description: 'List of image URLs' })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: 'Index of the main image in the images array', default: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  mainImageIndex?: number = 0;

  @ApiProperty({ description: 'Localized facilities', example: { fa: ['وای‌فای', 'پارکینگ'], en: ['Wi-Fi', 'Parking'] }, required: false })
  @IsOptional()
  @IsObject()
  facilities?: Record<string, string[]>;

  @ApiProperty({ description: 'Localized opening hours', example: { fa: '8-18', en: '8AM-6PM' } })
  @IsNotEmpty()
  @IsObject()
  openingHours: Record<string, string>;

  @ApiProperty({ description: 'Localized entry fee', example: { fa: '20 هزار تومان', en: '$2' } })
  @IsNotEmpty()
  @IsObject()
  entryFee: Record<string, string>;

  @ApiProperty({ description: 'Rating between 0 and 5', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({ description: 'Number of reviews', required: false })
  @IsOptional()
  @IsNumber()
  reviews?: number;
  latlng: { lat: number; lng: number; };
}
