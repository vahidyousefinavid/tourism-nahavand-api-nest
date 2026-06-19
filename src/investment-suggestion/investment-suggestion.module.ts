import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentSuggestion } from './entities/investment-suggestion.entity';
import { InvestmentSuggestionController } from './investment-suggestion.controller';
import { InvestmentSuggestionService } from './investment-suggestion.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentSuggestion])],
  controllers: [InvestmentSuggestionController],
  providers: [InvestmentSuggestionService],
  exports: [InvestmentSuggestionService],
})
export class InvestmentSuggestionModule {}
