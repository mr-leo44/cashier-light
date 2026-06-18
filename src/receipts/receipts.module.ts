import { Module } from '@nestjs/common';
import { ReceiptNumberGeneratorService } from './services/receipt-number-generator.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';

@Module({
  imports: [PrismaModule],
  providers: [ReceiptNumberGeneratorService, ReceiptsService],
  controllers: [ReceiptsController],
})
export class ReceiptsModule {}
