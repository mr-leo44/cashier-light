import { Module } from '@nestjs/common';
import { ReceiptNumberGeneratorService } from './services/receipt-number-generator.service';
import { ReceiptPdfService } from './services/receipt-pdf.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReceiptsController],
  providers: [
    ReceiptsService,
    ReceiptNumberGeneratorService,
    ReceiptPdfService,
  ],
})
export class ReceiptsModule {}
