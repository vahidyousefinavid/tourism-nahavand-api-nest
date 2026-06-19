import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateSuggestionStatusDto {
  @IsEnum(['pending', 'reviewed', 'approved', 'rejected'])
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  adminNotes?: string;
}
