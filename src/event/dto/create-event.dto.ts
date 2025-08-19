import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsInt,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEventTimeRangeDto } from 'src/event-time-range/dto/event-time-range.dto';

export class CreateEventDto {
  @IsNotEmpty()
  @IsObject()
  title: { [lang: string]: string };
  // مثال: { fa: "عنوان فارسی", en: "English Title" }

  @IsOptional()
  @IsObject()
  description?: { [lang: string]: string };
  // مثال: { fa: "توضیحات فارسی", en: "English Description" }

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  @IsObject()
  location: { [lang: string]: string };
  // مثال: { fa: "تهران", en: "Tehran" }

  @IsOptional()
  @IsObject()
  latlng?: { lat: number; lng: number };

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsInt()
  capacity?: number;

  @IsOptional()
  @IsInt()
  registered?: number;

  @IsOptional()
  @IsObject()
  organizer?: { [lang: string]: string };
  // مثال: { fa: "توضیحات فارسی", en: "English Description" }

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEventTimeRangeDto)
  timeRanges?: CreateEventTimeRangeDto[];
}
