import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';

@Injectable()
export class SchoolYearsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSchoolYearDto) {
    const existing = await this.prisma.schoolYear.findUnique({
      where: {
        label: dto.label,
      },
    });

    if (existing) {
      throw new BadRequestException('School year already exists');
    }

    return this.prisma.schoolYear.create({
      data: {
        label: dto.label,
      },
    });
  }

  async findAll() {
    return this.prisma.schoolYear.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCurrent() {
    return this.prisma.schoolYear.findFirst({
      where: {
        isCurrent: true,
      },
    });
  }

  async setCurrent(id: string) {
    const schoolYear = await this.prisma.schoolYear.findUnique({
      where: {
        id,
      },
    });

    if (!schoolYear) {
      throw new NotFoundException('School year not found');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.schoolYear.updateMany({
        data: {
          isCurrent: false,
        },
      });

      return tx.schoolYear.update({
        where: {
          id,
        },
        data: {
          isCurrent: true,
        },
      });
    });
  }
}
