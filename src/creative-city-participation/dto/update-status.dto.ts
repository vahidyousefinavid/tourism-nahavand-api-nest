import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateParticipationStatusDto {
  @IsIn(['pending', 'reviewed', 'approved', 'rejected'])
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  adminNotes?: string;
}
