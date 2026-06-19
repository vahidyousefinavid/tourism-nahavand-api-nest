import { PartialType } from '@nestjs/mapped-types';
import { CreateCreativeCityNewsDto } from './create-creative-city-news.dto';

export class UpdateCreativeCityNewsDto extends PartialType(CreateCreativeCityNewsDto) {}
