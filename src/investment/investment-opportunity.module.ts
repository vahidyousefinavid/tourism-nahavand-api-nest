import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentOpportunity } from './entities/InvestmentOpportunity.entity';
import { InvestmentOpportunityService } from './investment-opportunity.service';
import { InvestmentOpportunityController } from './investment-opportunity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentOpportunity])],
  controllers: [InvestmentOpportunityController],
  providers: [InvestmentOpportunityService],
})
export class InvestmentOpportunityModule {}
