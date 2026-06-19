import { PartialType } from '@nestjs/mapped-types';
import { CreateNaturePlaceDto } from './create-nature-place.dto';

export class UpdateNaturePlaceDto extends PartialType(CreateNaturePlaceDto) {}
