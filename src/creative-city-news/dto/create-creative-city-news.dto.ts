import { IsOptional, IsIn, IsObject } from 'class-validator';

export class CreateCreativeCityNewsDto {
  @IsObject()
  title: { fa: string; en?: string; ar?: string; zh?: string };

  @IsObject()
  summary: { fa: string; en?: string; ar?: string; zh?: string };

  @IsOptional()
  @IsObject()
  content?: { fa: string; en?: string; ar?: string; zh?: string };

  @IsOptional()
  imageUrl?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: 'draft' | 'published';
}
