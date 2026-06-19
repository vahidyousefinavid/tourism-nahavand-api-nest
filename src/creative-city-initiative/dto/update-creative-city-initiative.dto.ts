import { PartialType } from '@nestjs/mapped-types';
import { CreateCreativeCityInitiativeDto } from './create-creative-city-initiative.dto';

export class UpdateCreativeCityInitiativeDto extends PartialType(CreateCreativeCityInitiativeDto) {}
