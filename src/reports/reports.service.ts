import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import dayjs from 'dayjs';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async dailyReport(date: string, schoolYearId: string) {
    const start = dayjs(date).startOf('day').toDate();
    const end = dayjs(date).endOf('day').toDate();

    const receipts = await this.prisma.receipt.findMany({
      where: {
        paymentDate: {
          gte: start,
          lte: end,
        },
        schoolYearId,
      },
      include: {
        feeType: true,
      },
    });

    const totalCDF = receipts
      .filter((r) => r.currency === 'CDF')
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const totalUSD = receipts
      .filter((r) => r.currency === 'USD')
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const byFeeType = receipts.reduce(
      (acc, r) => {
        const key = r.feeType.name;

        if (!acc[key]) {
          acc[key] = {
            count: 0,
            totalCDF: 0,
            totalUSD: 0,
          };
        }

        acc[key].count += 1;

        if (r.currency === 'CDF') {
          acc[key].totalCDF += Number(r.amount);
        } else {
          acc[key].totalUSD += Number(r.amount);
        }

        return acc;
      },
      {} as Record<string, any>,
    );

    return {
      date,
      schoolYearId,
      totalReceipts: receipts.length,
      totalCDF,
      totalUSD,
      byFeeType,
      receipts,
    };
  }
}
