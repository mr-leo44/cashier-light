import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  create(@Body() dto: CreateReceiptDto) {
    return this.receiptsService.create(dto);
  }

  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(id);
  }

  @Get(':id/pdf')
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const pdfBuffer = await this.receiptsService.generatePdf(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="receipt-${id}.pdf"`,
    });

    res.send(pdfBuffer);
  }
}
