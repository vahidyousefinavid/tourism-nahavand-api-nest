import { IsOptional, IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateEventTimeRangeDto {
  @IsOptional()
  @IsUUID()
  eventId: string;

  @IsString()
  mode: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  timeStart?: string;

  @IsOptional()
  @IsString()
  timeEnd?: string;

  @IsOptional()
  @IsString()
  daysOfWeek?: string;

  @IsOptional()
  @IsString()
  specificDates?: string;

  @IsOptional()
  @IsString()
  exceptions?: string;

  @IsOptional()
  @IsString()
  ranges?: string;
}

export class UpdateEventTimeRangeDto extends CreateEventTimeRangeDto { }
