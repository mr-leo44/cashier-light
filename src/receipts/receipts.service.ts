import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ReceiptNumberGeneratorService } from './services/receipt-number-generator.service';

@Injectable()
export class ReceiptsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generator: ReceiptNumberGeneratorService,
  ) {}

  async create(dto: CreateReceiptDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Vérifier année scolaire
      const schoolYear = await tx.schoolYear.findUnique({
        where: { id: dto.schoolYearId },
      });

      if (!schoolYear) {
        throw new NotFoundException('School year not found');
      }

      // 2. Vérifier fee type
      const feeType = await tx.feeType.findUnique({
        where: { id: dto.feeTypeId },
      });

      if (!feeType) {
        throw new NotFoundException('Fee type not found');
      }

      // 3. Générer numéro reçu
      const receiptNumber = await this.generator.generate(dto.schoolYearId);

      // 4. Créer reçu
      const receipt = await tx.receipt.create({
        data: {
          receiptNumber,
          studentName: dto.studentName,
          feeTypeId: dto.feeTypeId,
          currency: dto.currency,
          amount: dto.amount,
          cashierName: dto.cashierName,
          schoolYearId: dto.schoolYearId,
        },
      });

      return receipt;
    });
  }

  async findAll() {
    return this.prisma.receipt.findMany({
      orderBy: {
        paymentDate: 'desc',
      },
      include: {
        schoolYear: true,
        feeType: true,
      },
    });
  }

  async findOne(id: string) {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id },
      include: {
        schoolYear: true,
        feeType: true,
      },
    });

    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    return receipt;
  }
}
