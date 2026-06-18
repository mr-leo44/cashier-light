import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReceiptNumberGeneratorService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(schoolYearId: string): Promise<string> {
    return this.prisma.$transaction(async (tx) => {
      const schoolYear = await tx.schoolYear.findUnique({
        where: { id: schoolYearId },
      });

      if (!schoolYear) {
        throw new NotFoundException('School year not found');
      }

      const updated = await tx.schoolYear.update({
        where: { id: schoolYear.id },
        data: {
          receiptCount: {
            increment: 1,
          },
        },
      });

      const sequence = updated.receiptCount.toString().padStart(6, '0');

      return `REC-${schoolYear.label}-${sequence}`;
    });
  }
}
