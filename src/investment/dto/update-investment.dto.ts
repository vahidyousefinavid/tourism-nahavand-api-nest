import { PartialType } from '@nestjs/swagger';
import { CreateInvestmentOpportunityDto } from './create-investment.dto';

export class UpdateInvestmentOpportunityDto extends PartialType(CreateInvestmentOpportunityDto) {}
