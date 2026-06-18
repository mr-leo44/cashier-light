import { Module } from '@nestjs/common';
import { ReceiptNumberGeneratorService } from './services/receipt-number-generator.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReceiptNumberGeneratorService],
  exports: [ReceiptNumberGeneratorService],
})
export class ReceiptsModule {}
